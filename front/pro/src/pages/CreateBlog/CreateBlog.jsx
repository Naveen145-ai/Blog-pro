import { useState, useRef } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateBlog.css";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (file) => {
    // Validate file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setMessage({
        type: "error",
        text: "Image size must be less than 5MB. Please choose a smaller image.",
      });
      return;
    }
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    // support both input change and drop events
    const file = e?.target?.files?.[0] || e?.dataTransfer?.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleFile(file);
    }
  }; 

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Please enter a blog title" });
      return false;
    }
    if (!formData.image) {
      setMessage({ type: "error", text: "Please upload an image" });
      return false;
    }
    if (!formData.content.trim()) {
      setMessage({ type: "error", text: "Please enter blog content" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Get the file from input to send as FormData
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setMessage({ type: "error", text: "Please select an image" });
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("image", file); // Send file object, not base64
      formDataToSend.append("content", formData.content);

      const response = await fetch("http://localhost:9000/api/v1/add-blog", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
        // DO NOT set Content-Type header - browser will set it with correct boundary
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Blog created successfully!",
        });
        setFormData({ title: "", image: "", content: "" });
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setMessage({
          type: "error",
          text: data.Error || "Failed to create blog",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="create-blog-container">
        <div className="create-blog-wrapper">
          <h1 className="create-blog-title">Create a New Blog</h1>
          <p className="create-blog-subtitle">
            Share your thoughts and ideas with the world
          </p>

          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="blog-form">
            {/* Title Input */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title..."
                className="form-input"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image" className="form-label">
                Cover Image
              </label>
              <div className="image-upload-wrapper" onDragEnter={handleDrag}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                  ref={fileInputRef}
                  required
                />
                <div
                  className={`upload-area ${dragActive ? "drag-active" : ""}`}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      fileInputRef.current && fileInputRef.current.click();
                    }
                  }}
                >
                  <svg
                    className="upload-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="upload-text">Click or drag an image here</p>
                </div>
              </div>

              {previewImage && (
                <div className="image-preview">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="preview-img"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, image: "" });
                      setPreviewImage(null);
                    }}
                    className="remove-image-btn"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Content Input */}
            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Blog Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                className="form-textarea"
                rows="10"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className={`submit-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Publishing...
                  </>
                ) : (
                  "Publish Blog"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({ title: "", image: "", content: "" });
                  setPreviewImage(null);
                  setMessage({ type: "", text: "" });
                }}
                className="reset-btn"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
