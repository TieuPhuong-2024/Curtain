'use client';

import { useState, useEffect, useRef } from 'react';
import { uploadImage } from '@/lib/api';
import { getContentStats, renderCKEditorContent } from '@/utils/ckeditorConverter';

// Flag to track if editor has been initialized globally
let isEditorInitialized = false;

const CKEditorComponent = ({ 
  initialContent, 
  onChange, 
  editable = true,
  height = '400px',
  autosave = false,
  autosaveInterval = 30000, // 30 seconds
  showStatistics = true,
  allowPreview = true,
  className = '',
  label
}) => {
  const editorRef = useRef();
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [statistics, setStatistics] = useState({ words: 0, chars: 0, charsNoSpace: 0 });
  const [editorData, setEditorData] = useState(initialContent || '');
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Detect theme preference
  useEffect(() => {
    // Check for system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Autosave functionality
  useEffect(() => {
    let autosaveTimer;
    
    if (autosave && editable && editorData) {
      autosaveTimer = setInterval(() => {
        // You can implement a proper autosave function here
        console.log('Autosaving...', new Date().toLocaleTimeString());
        localStorage.setItem('ckeditor_autosave', editorData);
      }, autosaveInterval);
    }
    
    return () => {
      if (autosaveTimer) clearInterval(autosaveTimer);
    };
  }, [autosave, autosaveInterval, editable, editorData]);

  // Update statistics when editorData changes
  useEffect(() => {
    if (showStatistics && editorData) {
      const stats = getContentStats(editorData);
      setStatistics(stats);
    }
  }, [editorData, showStatistics]);

  useEffect(() => {
    let editor = null;
    let initTimer = null;
    
    // Ngăn hiển thị hai toolbar bằng cách sử dụng một biến global
    const setupEditor = async () => {
      // Nếu đã có editor được khởi tạo, bỏ qua
      if (isEditorInitialized) {
        console.log('CKEditor already initialized, skipping initialization');
        setIsLoading(false);
        return;
      }
      
      // Kiểm tra container
      if (!containerRef.current) {
        setIsLoading(false);
        return;
      }
      
      // Kiểm tra thêm một lần nữa xem đã có CKEditor nào trong DOM chưa
      if (document.querySelector('.ck-editor')) {
        console.log('CKEditor element already found in DOM');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        isEditorInitialized = true; // Set flag trước khi khởi tạo
        
        // Import CKEditor
        const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
        
        const editorConfig = {
          placeholder: 'Start writing...',
          toolbar: {
            items: [
              'undo', 'redo', '|',
              'heading', '|',
              'bold', 'italic', 'underline', 'strikethrough', '|',
              'fontSize', 'fontColor', 'fontBackgroundColor', '|',
              'link', 'bulletedList', 'numberedList', 'todoList', '|',
              'alignment', 'outdent', 'indent', '|',
              'uploadImage', 'insertTable', 'blockQuote', 'codeBlock', '|',
              'horizontalLine', 'pageBreak', 'specialCharacters'
            ],
            shouldNotGroupWhenFull: true
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
          },
          image: {
            toolbar: [
              'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
              'toggleImageCaption', 'imageTextAlternative', '|',
              'linkImage', 'resizeImage'
            ],
            resizeOptions: [
              {
                name: 'resizeImage:original',
                label: 'Original',
                value: null
              },
              {
                name: 'resizeImage:50',
                label: '50%',
                value: '50'
              },
              {
                name: 'resizeImage:75',
                label: '75%',
                value: '75'
              }
            ],
            styles: {
              options: [
                'inline', 'block', 'side'
              ]
            }
          },
          table: {
            contentToolbar: [
              'tableColumn', 'tableRow', 'mergeTableCells',
              'tableProperties', 'tableCellProperties'
            ],
            tableProperties: {
              borderColors: [/* colors */],
              backgroundColors: [/* colors */]
            },
            tableCellProperties: {
              borderColors: [/* colors */],
              backgroundColors: [/* colors */]
            }
          },
          link: {
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                defaultValue: true
              },
              toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                  download: 'file'
                }
              }
            }
          },
          // Configure image upload
          simpleUpload: {
            uploadUrl: '/api/images',
            // Handle image upload
            uploadAdapter: (loader) => {
              return {
                upload: async () => {
                  const file = await loader.file;
                  try {
                    const response = await uploadImage(file);
                    return { default: response.url };
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    return Promise.reject(error);
                  }
                }
              };
            }
          },
          mediaEmbed: {
            previewsInData: true
          },
          // Ensure the content styles match the defined height
          height: height
        };

        // Chỉ khởi tạo khi chưa có editor và container sẵn sàng
        if (!editorRef.current && containerRef.current) {
          // Initialize the editor
          ClassicEditor
            .create(containerRef.current, editorConfig)
            .then(newEditor => {
              editor = newEditor;
              editorRef.current = newEditor;

              // Set initial content if provided
              if (initialContent) {
                newEditor.setData(initialContent);
              }

              // Handle content changes
              newEditor.model.document.on('change:data', () => {
                const data = newEditor.getData();
                setEditorData(data);
                if (onChange) {
                  onChange(data);
                }
              });

              // Set editor as read-only if not editable
              if (!editable) {
                newEditor.isReadOnly = true;
              }

              // Try to load autosaved content if no initial content provided
              if (!initialContent && autosave) {
                const savedContent = localStorage.getItem('ckeditor_autosave');
                if (savedContent) {
                  newEditor.setData(savedContent);
                }
              }

              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error initializing CKEditor:', error);
              isEditorInitialized = false; // Reset flag on error
              setIsLoading(false);
            });
        }
      } catch (error) {
        console.error('Failed to load CKEditor:', error);
        isEditorInitialized = false; // Reset flag on error
        setIsLoading(false);
      }
    };

    // Trì hoãn khởi tạo để tránh khởi tạo kép trong React Strict Mode
    initTimer = setTimeout(() => {
      setupEditor();
    }, 50);

    // Cleanup on unmount
    return () => {
      // Xóa timer nếu component unmount
      if (initTimer) {
        clearTimeout(initTimer);
      }
      
      // Destroy editor và reset flag
      if (editorRef.current) {
        editorRef.current.destroy()
          .then(() => {
            editorRef.current = null;
            isEditorInitialized = false; // Reset flag khi destroy
          })
          .catch(error => {
            console.error('Error destroying CKEditor:', error);
          });
      }
    };
  }, [initialContent, onChange, editable, height, autosave]);

  // Handle preview mode toggle
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className={`ckeditor-wrapper ${className} ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      
      {/* Editor controls */}
      {editable && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <div className="editor-statistics space-x-4">
            {showStatistics && (
              <>
                <span className="stat-item">Words: {statistics.words}</span>
                <span className="stat-item">Characters: {statistics.chars}</span>
              </>
            )}
          </div>
          <div className="editor-actions space-x-2">
            {allowPreview && (
              <button 
                onClick={togglePreviewMode}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {isPreviewMode ? 'Edit' : 'Preview'}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Main editor container */}
      <div 
        className={`border rounded-lg overflow-hidden transition-all duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        style={{ minHeight: editable ? height : 'auto' }}
      >
        {isPreviewMode ? (
          // Preview mode
          <div 
            className="preview-container p-4 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderCKEditorContent(editorData) }}
          />
        ) : (
          // Edit mode
          <div ref={containerRef} className="w-full h-full" />
        )}
      </div>

      {/* Loading indicator and status */}
      {isLoading && (
        <div className="flex justify-center items-center mt-2">
          <div className="loading-spinner mr-2"></div>
          <span className="text-sm text-gray-600">Loading editor...</span>
        </div>
      )}
      
      {/* Add custom styles for dark theme and spinner */}
      <style jsx>{`
        .ckeditor-wrapper.dark-theme {
          --ck-color-base-background: #1e1e1e;
          --ck-color-base-foreground: #2f2f2f;
          --ck-color-text: #c9c9c9;
          --ck-color-focus-border: #0f90fa;
          --ck-color-button-default-background: #2f2f2f;
          --ck-color-button-default-hover-background: #3e3e3e;
          color: #c9c9c9;
        }
        
        .preview-container {
          min-height: ${height};
          background-color: ${theme === 'dark' ? '#1e1e1e' : '#ffffff'};
          color: ${theme === 'dark' ? '#c9c9c9' : 'inherit'};
        }
        
        .loading-spinner {
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-left-color: #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CKEditorComponent; 