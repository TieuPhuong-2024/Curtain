'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/api';
import CKEditorComponent from '@/components/CKEditorComponent';
import ImageUploader from '@/components/ImageUploader';
import Image from 'next/image';

export default function EditPost({ params }) {
  const postId = use(params).id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);

        // Set form data
        setTitle(post.title);
        setSummary(post.summary || '');
        setStatus(post.status);
        setFeaturedImage(post.featuredImage);
        setContent(post.content);

        // Convert tags array to comma-separated string
        if (post.tags && Array.isArray(post.tags)) {
          setTags(post.tags.join(', '));
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to load post');
        console.error(err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // Handle featured image upload
  const handleImageUpload = (urls) => {
    if (urls && urls.length > 0) {
      setFeaturedImage(urls[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Process tags from comma-separated string to array
      const tagsArray = tags
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      // Create post data
      const postData = {
        title,
        content,
        summary: summary || null,
        tags: tagsArray,
        status,
        featuredImage: featuredImage || null
      };

      // Send to API
      await updatePost(postId, postData);

      // Redirect to posts list
      router.push('/admin/posts');
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chỉnh sửa bài viết</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Tiêu đề *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Summary */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="summary">
            Tóm tắt
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hình ảnh nổi bật
          </label>
          <ImageUploader onUpload={handleImageUpload} isMultiple={false} />

          {/* Display uploaded image */}
          {featuredImage && (
            <div className="mt-4 relative group rounded-md overflow-hidden border w-40 h-24">
              <img
                src={featuredImage}
                alt="Featured image"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setFeaturedImage(null)}
                className="cursor-pointer absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Xóa
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags (phân cách bởi dấu phẩy)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Trạng thái
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </div>

        {/* Content Editor */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nội dung *
          </label>
          <CKEditorComponent
            onChange={setContent}
            initialContent={content}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              'Cập nhật bài viết'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 