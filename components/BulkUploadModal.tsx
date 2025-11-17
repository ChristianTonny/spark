'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { X, Upload, Download, AlertCircle, CheckCircle, FileText } from 'lucide-react';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedStudent {
  firstName: string;
  lastName: string;
  email: string;
  gradeLevel: string;
  school: string;
}

export default function BulkUploadModal({ isOpen, onClose }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const importStudents = useMutation(api.bulkOperations.importStudents);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      // Skip header row
      const dataLines = lines.slice(1);
      
      const parsed: ParsedStudent[] = dataLines.map(line => {
        // Handle CSV with quotes and commas
        const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
        
        return {
          firstName: cleanValues[0] || '',
          lastName: cleanValues[1] || '',
          email: cleanValues[2] || '',
          gradeLevel: cleanValues[3] || '',
          school: cleanValues[4] || '',
        };
      }).filter(s => s.email); // Filter out empty rows
      
      setStudents(parsed);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (students.length === 0) {
      alert('No valid students to import');
      return;
    }

    setIsProcessing(true);
    try {
      const importResult = await importStudents({ students });
      setResult(importResult);
    } catch (error) {
      alert('Failed to import students: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `firstName,lastName,email,gradeLevel,school
Jean,Mukamana,jean.mukamana@school.rw,Senior 5,Lycée de Kigali
Aline,Uwamahoro,aline.uwamahoro@school.rw,Senior 6,Green Hills Academy`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-import-template.csv';
    a.click();
  };

  const handleClose = () => {
    setFile(null);
    setStudents([]);
    setResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white border-4 border-black shadow-brutal-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b-4 border-black flex items-center justify-between bg-brutal-green">
          <div className="flex items-center gap-3">
            <Upload className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-black uppercase text-white">Bulk Upload Students</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 bg-white border-2 border-black hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Instructions */}
          {!result && (
            <>
              <div className="bg-brutal-yellow border-3 border-black p-4 mb-6">
                <h3 className="font-black text-lg mb-2 uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-sm font-bold">
                  <li>Download the CSV template below</li>
                  <li>Fill in student information (firstName, lastName, email, gradeLevel, school)</li>
                  <li>Upload the completed CSV file</li>
                  <li>Review the preview and confirm import</li>
                </ol>
              </div>

              {/* Download Template Button */}
              <button
                onClick={downloadTemplate}
                className="w-full mb-6 px-6 py-4 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CSV Template
              </button>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block mb-2 font-black uppercase text-sm">
                  Select CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-3 border-black font-bold"
                />
              </div>

              {/* Preview */}
              {students.length > 0 && (
                <>
                  <div className="mb-4">
                    <h3 className="font-black text-lg mb-3 uppercase">
                      Preview ({students.length} students)
                    </h3>
                    <div className="border-3 border-black max-h-60 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-b-2 border-black sticky top-0">
                          <tr>
                            <th className="px-3 py-2 text-left font-black uppercase text-xs">#</th>
                            <th className="px-3 py-2 text-left font-black uppercase text-xs">Name</th>
                            <th className="px-3 py-2 text-left font-black uppercase text-xs">Email</th>
                            <th className="px-3 py-2 text-left font-black uppercase text-xs">Grade</th>
                            <th className="px-3 py-2 text-left font-black uppercase text-xs">School</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-gray-200">
                          {students.map((student, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-bold">{idx + 1}</td>
                              <td className="px-3 py-2 font-bold">
                                {student.firstName} {student.lastName}
                              </td>
                              <td className="px-3 py-2 font-bold">{student.email}</td>
                              <td className="px-3 py-2 font-bold">{student.gradeLevel}</td>
                              <td className="px-3 py-2 font-bold">{student.school}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Upload Button */}
                  <button
                    onClick={handleUpload}
                    disabled={isProcessing}
                    className="w-full px-6 py-4 bg-brutal-green text-black border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-black uppercase text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Importing Students...' : `Import ${students.length} Students`}
                  </button>
                </>
              )}
            </>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-4">
              {/* Success Summary */}
              <div className={`border-3 border-black p-6 ${result.success > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  {result.success > 0 ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  )}
                  <div>
                    <h3 className="text-2xl font-black uppercase">
                      {result.success > 0 ? 'Import Complete!' : 'Import Failed'}
                    </h3>
                    <p className="font-bold text-sm">
                      {result.success} succeeded, {result.failed} failed
                    </p>
                  </div>
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="border-3 border-black">
                  <div className="bg-red-100 p-4 border-b-2 border-black">
                    <h4 className="font-black uppercase flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Errors ({result.errors.length})
                    </h4>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {result.errors.map((error: any, idx: number) => (
                      <div key={idx} className="p-3 border-b border-gray-200 text-sm">
                        <span className="font-black">Row {error.row}:</span>{' '}
                        <span className="font-bold">{error.email}</span> -{' '}
                        <span className="text-red-600 font-bold">{error.error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full px-6 py-3 bg-brutal-blue text-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
