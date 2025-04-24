const Contact = require('../models/contact.model');

// Create new contact request
exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({
            success: true,
            message: 'Yêu cầu tư vấn đã được gửi thành công',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Không thể gửi yêu cầu tư vấn',
            error: error.message
        });
    }
};

// Get all contact requests (for admin)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách yêu cầu tư vấn',
            error: error.message
        });
    }
};

// Update contact status
exports.updateContactStatus = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy yêu cầu tư vấn'
            });
        }
        res.json({
            success: true,
            message: 'Cập nhật trạng thái thành công',
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Không thể cập nhật trạng thái',
            error: error.message
        });
    }
};