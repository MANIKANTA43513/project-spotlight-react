import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  id: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  id?: string;
  password?: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.id.trim()) {
      tempErrors.id = 'ID is required';
    }

    if (!formData.password.trim()) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', id: '', password: '' });
    }
  };

  return (
    <div className="task-card">
      <h2 className="section-title">📋 User Registration Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="label-text">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`input-base ${errors.name ? 'border-destructive focus:ring-destructive' : ''}`}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`input-base ${errors.email ? 'border-destructive focus:ring-destructive' : ''}`}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* ID Field */}
        <div>
          <label className="label-text">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter your ID"
            className={`input-base ${errors.id ? 'border-destructive focus:ring-destructive' : ''}`}
          />
          {errors.id && <p className="error-text">{errors.id}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="label-text">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`input-base pr-12 ${errors.password ? 'border-destructive focus:ring-destructive' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="btn-primary w-full">
          Submit
        </button>
      </form>

      {/* Submitted Data Display */}
      {submittedData && (
        <div className="mt-6 p-4 bg-accent rounded-lg border border-primary/20 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-success" size={20} />
            <h3 className="font-semibold text-foreground">Form Submitted Successfully!</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-muted-foreground">Name:</span> {submittedData.name}</p>
            <p><span className="font-medium text-muted-foreground">Email:</span> {submittedData.email}</p>
            <p><span className="font-medium text-muted-foreground">ID:</span> {submittedData.id}</p>
            <p><span className="font-medium text-muted-foreground">Password:</span> {'•'.repeat(submittedData.password.length)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
