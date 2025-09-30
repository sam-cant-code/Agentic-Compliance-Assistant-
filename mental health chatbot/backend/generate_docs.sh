#!/bin/bash

# Compliance Documents Generator
# Creates sample compliance documents for the knowledge base

set -e

DOCS_DIR="data/knowledge_base"
mkdir -p "$DOCS_DIR"

# GDPR Policy
cat > "$DOCS_DIR/gdpr_policy.txt" << 'EOF'
GDPR DATA PROTECTION POLICY

1. PERSONAL DATA PROCESSING PRINCIPLES

All personal data processing must comply with GDPR Article 5 principles:
- Lawfulness, fairness, and transparency
- Purpose limitation
- Data minimization
- Accuracy
- Storage limitation
- Integrity and confidentiality

2. LAWFUL BASIS FOR PROCESSING

Before processing personal data, identify lawful basis:
- Consent (Article 6(1)(a))
- Contract performance (Article 6(1)(b))
- Legal obligation (Article 6(1)(c))
- Vital interests (Article 6(1)(d))
- Public task (Article 6(1)(e))
- Legitimate interests (Article 6(1)(f))

3. DATA SUBJECT RIGHTS

Individuals have the right to:
- Information about processing (Articles 13-14)
- Access their data (Article 15)
- Rectification of inaccurate data (Article 16)
- Erasure ("right to be forgotten") (Article 17)
- Restrict processing (Article 18)
- Data portability (Article 20)
- Object to processing (Article 21)

4. PROHIBITED ACTIVITIES

NEVER include in communications:
- Personal data without lawful basis
- Special category data without explicit consent
- Data of children under 16 without parental consent
- Cross-border transfers to non-adequate countries without safeguards

5. MANDATORY DISCLOSURES

All data collection must include:
- Identity of data controller
- Purpose of processing
- Legal basis
- Retention period
- Data subject rights
- Contact details of Data Protection Officer
EOF

# HIPAA Policy
cat > "$DOCS_DIR/hipaa_policy.txt" << 'EOF'
HIPAA PRIVACY AND SECURITY POLICY

1. PROTECTED HEALTH INFORMATION (PHI)

PHI includes any information that:
- Is created or received by healthcare providers
- Relates to past, present, or future physical/mental health
- Identifies an individual or could reasonably identify an individual

2. MINIMUM NECESSARY STANDARD

Use or disclose only the minimum PHI necessary to accomplish the purpose:
- Limit access to PHI based on job responsibilities
- Implement role-based access controls
- Regular access reviews and audits

3. PERMITTED DISCLOSURES

PHI may be disclosed for:
- Treatment, payment, healthcare operations
- Required by law
- Public health activities
- With valid patient authorization

4. PROHIBITED ACTIVITIES

NEVER include in communications:
- Patient names with medical conditions
- Medical record numbers
- Social security numbers
- Birth dates with medical information
- Insurance claim numbers with health data

5. BREACH NOTIFICATION

Report suspected PHI breaches within:
- 24 hours to Privacy Officer
- 60 days to HHS (if >500 individuals)
- 60 days to affected individuals
- Annual summary to HHS (if <500 individuals)

6. BUSINESS ASSOCIATE REQUIREMENTS

All vendors handling PHI must:
- Sign Business Associate Agreement
- Implement appropriate safeguards
- Report breaches to covered entity
- Return or destroy PHI when contract ends
EOF

# SOC 2 Policy
cat > "$DOCS_DIR/soc2_policy.txt" << 'EOF'
SOC 2 COMPLIANCE POLICY

1. SECURITY PRINCIPLE

Access Controls:
- Multi-factor authentication required for all systems
- Principle of least privilege
- Regular access reviews (quarterly)
- Immediate access revocation upon termination

Data Protection:
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.2+)
- Secure backup procedures
- Data classification standards

2. AVAILABILITY PRINCIPLE

System Reliability:
- 99.9% uptime SLA requirement
- Redundant systems and failover procedures
- Regular disaster recovery testing
- Incident response plan activation within 15 minutes

Monitoring:
- 24/7 system monitoring
- Automated alerting for critical events
- Performance metrics tracking
- Regular capacity planning reviews

3. PROCESSING INTEGRITY

Data Accuracy:
- Input validation controls
- Data reconciliation procedures
- Error detection and correction
- Regular data quality assessments

Change Management:
- Formal change approval process
- Testing requirements before production
- Rollback procedures
- Change documentation

4. CONFIDENTIALITY PRINCIPLE

Information Classification:
- Public, Internal, Confidential, Restricted levels
- Handling requirements for each classification
- Data loss prevention controls
- Employee confidentiality agreements

Communication Security:
- Secure email for confidential information
- Encrypted file sharing
- VPN requirements for remote access
- Clean desk policy enforcement

5. PRIVACY PRINCIPLE

Data Collection:
- Notice to individuals about data collection
- Consent mechanisms
- Purpose limitation
- Data retention schedules

Individual Rights:
- Access request procedures
- Correction request handling
- Opt-out mechanisms
- Complaint resolution process
EOF

# Company Style Guide
cat > "$DOCS_DIR/company_style_guide.txt" << 'EOF'
COMPANY COMMUNICATION STYLE GUIDE

1. PROFESSIONAL COMMUNICATION STANDARDS

Tone and Voice:
- Professional yet approachable
- Clear and concise language
- Avoid jargon and technical terms in client communications
- Use active voice when possible

Email Guidelines:
- Professional subject lines
- Proper greeting and closing
- CC/BCC usage guidelines
- Response time expectations (24 hours for internal, 4 hours for clients)

2. REQUIRED DISCLAIMERS

Legal Disclaimer:
"This communication is confidential and may be legally privileged. If you are not the intended recipient, please notify the sender immediately and delete this communication."

Financial Communications:
"Past performance does not guarantee future results. Investment involves risk including potential loss of principal."

Medical/Health Communications:
"This information is for educational purposes only and does not constitute medical advice. Consult your healthcare provider for medical guidance."

3. PROHIBITED CONTENT

Never include in business communications:
- Discriminatory language based on race, gender, religion, age, or disability
- Profanity or inappropriate humor
- Personal opinions on political or controversial topics
- Unverified claims or statistics
- Confidential information without proper authorization

4. DOCUMENT FORMATTING

Headers and Footers:
- Company logo on first page
- Page numbers on multi-page documents
- Document version and date
- Classification level (Public, Internal, Confidential)

Font and Layout:
- Standard fonts: Arial, Calibri, or Times New Roman
- 11-12pt font size for body text
- Consistent heading styles
- Professional color scheme

5. APPROVAL REQUIREMENTS

Documents requiring legal review:
- Contracts and agreements
- Public statements or press releases
- Regulatory communications
- Marketing materials with claims
- Privacy notices and policies

Approval Workflow:
- Draft creation and self-review
- Department manager approval
- Legal review (if required)
- Final approval and distribution
- Version control and archiving
EOF

# Data Classification Policy
cat > "$DOCS_DIR/data_classification_policy.txt" << 'EOF'
DATA CLASSIFICATION AND HANDLING POLICY

1. DATA CLASSIFICATION LEVELS

PUBLIC DATA:
- Information already in public domain
- Marketing materials and press releases
- Public website content
- No special handling required

INTERNAL DATA:
- General business information
- Internal policies and procedures
- Employee directory information
- Standard email protection required

CONFIDENTIAL DATA:
- Customer information and contracts
- Financial data and reports
- Strategic business plans
- Encryption and access controls required

RESTRICTED DATA:
- Personal identifiable information (PII)
- Health information (PHI)
- Payment card data (PCI)
- Maximum security controls required

2. HANDLING REQUIREMENTS BY CLASSIFICATION

Email Communications:
- Public: No restrictions
- Internal: Company email system only
- Confidential: Encrypted email required
- Restricted: Secure portal or encrypted email with DLP controls

Storage Requirements:
- Public: No restrictions
- Internal: Company-approved storage only
- Confidential: Encrypted storage with access logging
- Restricted: Encrypted storage with MFA and audit trails

Sharing Guidelines:
- Public: No restrictions
- Internal: Company personnel only
- Confidential: Authorized personnel with business need
- Restricted: Explicit authorization required with signed agreements

3. RETENTION SCHEDULES

Customer Data:
- Active customer data: Retain while relationship exists + 7 years
- Inactive customer data: 3 years after last activity
- Marketing data: 2 years after collection
- Support tickets: 5 years after resolution

Employee Data:
- Active employee records: Current + 7 years after termination
- Payroll records: 7 years after tax year
- Benefits information: 6 years after plan year
- Training records: 3 years after completion

Financial Data:
- Tax records: 7 years after filing
- Audit records: 7 years after audit completion
- Contracts: 7 years after expiration
- Expense reports: 7 years after fiscal year

4. DATA BREACH RESPONSE

Immediate Actions (0-1 hours):
- Contain the incident
- Assess scope and impact
- Notify incident response team
- Document all actions taken

Short-term Response (1-24 hours):
- Detailed forensic analysis
- Notify affected parties if required
- Implement additional controls
- Coordinate with legal and compliance

Long-term Response (24+ hours):
- Regulatory notifications as required
- Public communications if necessary
- Lessons learned and policy updates
- Ongoing monitoring and remediation
EOF

# Email Communication Policy
cat > "$DOCS_DIR/email_communication_policy.txt" << 'EOF'
EMAIL COMMUNICATION COMPLIANCE POLICY

1. PROFESSIONAL EMAIL STANDARDS

Required Elements:
- Professional email signature with full contact information
- Clear and descriptive subject lines
- Proper spelling and grammar
- Appropriate level of formality based on recipient

Prohibited Content:
- Personal opinions on sensitive topics
- Discriminatory or offensive language
- Unauthorized disclosure of confidential information
- Unsupported claims or promises
- Personal use of company email for external communications

2. SECURITY REQUIREMENTS

Encryption Requirements:
- All emails containing PII must be encrypted
- Financial information requires end-to-end encryption
- Health information must use HIPAA-compliant email
- Legal documents require secure transmission

Attachment Guidelines:
- Maximum file size: 25MB
- Prohibited file types: .exe, .bat, .scr, .vbs
- Scan all attachments for malware
- Use secure file sharing for large or sensitive files

3. RETENTION AND ARCHIVING

Retention Periods:
- General business emails: 3 years
- Contracts and legal communications: 7 years
- HR and employment-related emails: 7 years
- Customer service emails: 5 years
- Marketing and promotional emails: 2 years

Legal Hold Requirements:
- Preserve emails under litigation hold
- IT will implement automated holds
- Employees must not delete emails under hold
- Report any accidental deletions immediately

4. EXTERNAL COMMUNICATION

Client Communications:
- Use approved email templates
- Include standard disclaimers
- Copy appropriate team members
- Maintain professional tone throughout

Vendor Communications:
- Use official company email only
- Include procurement team on contracts
- Document all commitments and agreements
- Maintain audit trail of decisions

5. MONITORING AND COMPLIANCE

Email Monitoring:
- Company reserves right to monitor all email
- Automated scanning for policy violations
- Data loss prevention (DLP) controls active
- Regular compliance audits conducted

Violation Reporting:
- Report suspicious emails to IT security
- Report policy violations to compliance team
- Managers must escalate serious violations
- Anonymous reporting options available

6. INCIDENT RESPONSE

Email Security Incidents:
- Immediately report suspected phishing
- Do not click suspicious links or attachments
- Change passwords if compromise suspected
- Isolate affected systems as directed by IT

Data Breach Response:
- Report potential data exposure within 1 hour
- Preserve evidence and logs
- Cooperate with forensic investigation
- Follow breach notification procedures
EOF

echo "✅ Compliance documents created in $DOCS_DIR/"
echo ""
echo "📄 Generated documents:"
echo "- GDPR Policy (gdpr_policy.txt)"
echo "- HIPAA Policy (hipaa_policy.txt)"  
echo "- SOC 2 Policy (soc2_policy.txt)"
echo "- Company Style Guide (company_style_guide.txt)"
echo "- Data Classification Policy (data_classification_policy.txt)"
echo "- Email Communication Policy (email_communication_policy.txt)"