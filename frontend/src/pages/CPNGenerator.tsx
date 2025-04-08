import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CPNFormData {
  state: string;
  ssn: string;
  purpose: string;
}

const CPNGenerator: React.FC = () => {
  const [formData, setFormData] = useState<CPNFormData>({
    state: '',
    ssn: '',
    purpose: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (!formData.state || !formData.ssn || !formData.purpose) {
        throw new Error('All fields are required');
      }

      if (!/^\d{9}$/.test(formData.ssn)) {
        throw new Error('SSN must be 9 digits');
      }

      // Mock CPN generation
      const mockCPN = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
      setResult(mockCPN);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate CPN');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          CPN Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 input-field"
              required
            >
              <option value="">Select a state</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              {/* Add more states as needed */}
            </select>
          </div>

          <div>
            <label htmlFor="ssn" className="block text-sm font-medium text-gray-700">
              SSN for Validation
            </label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
              pattern="\d{9}"
              maxLength={9}
              className="mt-1 input-field"
              placeholder="Enter 9-digit SSN"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Format: 9 digits without dashes
            </p>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
              Purpose
            </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="mt-1 input-field"
              placeholder="Enter purpose for CPN generation"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
              <p className="font-medium">Generated CPN:</p>
              <p className="text-2xl font-mono mt-1">{result}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </div>
              ) : (
                'Generate CPN'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Information Panel */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-blue-900 mb-4">
          Important Information
        </h2>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            CPNs are generated in compliance with state and federal regulations.
          </li>
          <li className="flex items-center">
            <i className="fas fa-shield-alt mr-2"></i>
            All data is encrypted and handled securely.
          </li>
          <li className="flex items-center">
            <i className="fas fa-clock mr-2"></i>
            Processing typically takes 2-3 business days.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CPNGenerator;
