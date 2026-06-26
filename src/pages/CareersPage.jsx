import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { User, Mail, Phone, Briefcase, MessageSquare, Paperclip, Send, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import './CareersPage.css';

const CareersPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      setResume(null);
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size must be under 5 MB.');
      setResume(null);
      e.target.value = '';
      return;
    }
    setErrorMsg('');
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please fill in your name and email address.');
      return;
    }
    if (!resume) {
      setErrorMsg('Please attach your resume/CV before submitting.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const fd = new FormData();
      fd.append('name', name.trim());
      fd.append('email', email.trim());
      fd.append('phone', phone.trim());
      fd.append('position', position.trim());
      fd.append('message', message.trim());
      fd.append('resume', resume);

      // Do NOT set Content-Type header — browser must set it with the multipart boundary
      const res = await fetch('/api/careers', { method: 'POST', body: fd });
      const result = await res.json();

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(result.errors ? result.errors.join(' ') : (result.message || 'Submission failed. Please try again.'));
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please email your resume directly to inquiry@inventasystems.in');
    }
  };

  const resetForm = () => {
    setName(''); setEmail(''); setPhone(''); setPosition(''); setMessage('');
    setResume(null); setStatus('idle'); setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <main className="careers-page">
      <SEO
        title="Careers at Inventa Systems"
        description="Join the Inventa Systems team. We hire scientists, engineers, and technical sales professionals. Explore career opportunities in laboratory instruments and solutions across India."
        keywords="careers Inventa Systems, scientific jobs India, lab instrument sales jobs, laboratory technician jobs Ahmedabad, life sciences careers India"
        canonical="/careers"
      />
      <section className="careers-hero">
        <motion.h1
          className="careers-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shape the Future of Life Sciences.
        </motion.h1>
        <motion.p
          className="careers-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join Inventa Systems, Gujarat's leading authorized distributor of advanced laboratory equipment and discover a career that fuels innovation.
        </motion.p>
      </section>

      <section className="culture-section">
        <motion.div
          className="perks-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>Continuous Learning</h3>
            <p>Work directly with state-of-the-art technologies from top global manufacturers like Thermo Fisher Scientific. We invest heavily in your technical training.</p>
          </motion.div>
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>Impactful Work</h3>
            <p>Our solutions directly support molecular biology, forensics, genomics, and diagnostics labs working on life-changing research.</p>
          </motion.div>
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>State of the Art Facilities</h3>
            <p>Operate out of our premium offices and 15,000 sq.ft warehouse in Ahmedabad, designed for efficiency and collaboration.</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="open-roles"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="roles-title">Current Opportunities</h2>
          <p className="roles-desc">
            We are always on the lookout for talented Service Engineers, Sales Experts, and Technical Support Specialists who are passionate about the scientific sector.
          </p>

          {status === 'success' ? (
            <motion.div
              className="career-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle2 size={48} className="career-success-icon" />
              <h3>Application Received!</h3>
              <p>Thank you, {name}. We've received your application and will review it shortly. We'll be in touch if your profile matches our current openings.</p>
              <button className="career-reset-btn" onClick={resetForm}>Submit Another Application</button>
            </motion.div>
          ) : (
            <form className="career-form" onSubmit={handleSubmit} noValidate>
              <div className="career-form-grid">
                <div className="career-field">
                  <label className="career-label">Full Name <span>*</span></label>
                  <div className="career-input-wrap">
                    <User size={15} className="career-input-icon" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="career-input"
                    />
                  </div>
                </div>

                <div className="career-field">
                  <label className="career-label">Email Address <span>*</span></label>
                  <div className="career-input-wrap">
                    <Mail size={15} className="career-input-icon" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="career-input"
                    />
                  </div>
                </div>

                <div className="career-field">
                  <label className="career-label">Phone Number</label>
                  <div className="career-input-wrap">
                    <Phone size={15} className="career-input-icon" />
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="career-input"
                    />
                  </div>
                </div>

                <div className="career-field">
                  <label className="career-label">Position Applied For</label>
                  <div className="career-input-wrap">
                    <Briefcase size={15} className="career-input-icon" />
                    <input
                      type="text"
                      placeholder="e.g. Service Engineer, Sales Executive…"
                      value={position}
                      onChange={e => setPosition(e.target.value)}
                      className="career-input"
                    />
                  </div>
                </div>
              </div>

              <div className="career-field career-field--full">
                <label className="career-label">Cover Letter / Message</label>
                <div className="career-input-wrap career-textarea-wrap">
                  <MessageSquare size={15} className="career-input-icon career-input-icon--top" />
                  <textarea
                    placeholder="Tell us about yourself, your experience, and why you'd like to join Inventa Systems…"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={4}
                    className="career-input career-textarea"
                  />
                </div>
              </div>

              <div className="career-field career-field--full">
                <label className="career-label">Resume / CV <span>*</span></label>
                <div
                  className={`career-file-drop ${resume ? 'has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {resume ? (
                    <>
                      <Paperclip size={18} className="career-file-icon" />
                      <span className="career-file-name">{resume.name}</span>
                      <button
                        type="button"
                        className="career-file-remove"
                        onClick={e => { e.stopPropagation(); setResume(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Paperclip size={20} className="career-file-icon" />
                      <span>Click to attach your resume</span>
                      <span className="career-file-hint">PDF, DOC, or DOCX — max 5 MB</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>

              {errorMsg && (
                <div className="career-error">
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {status === 'error' && !errorMsg && (
                <div className="career-error">
                  <AlertCircle size={15} />
                  <span>Something went wrong. Email us directly at <a href="mailto:inquiry@inventasystems.in">inquiry@inventasystems.in</a></span>
                </div>
              )}

              <button
                type="submit"
                className="apply-cta career-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><Loader2 size={18} className="career-spinner" /> Submitting Application…</>
                ) : (
                  <><Send size={18} /> Submit Application</>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </main>
  );
};

export default CareersPage;
