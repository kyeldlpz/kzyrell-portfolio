export interface Project {
  title: string;
  image: string;
  description: string;
  services: string[];
  cover?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Serverless PDF Processing Pipeline',
    image: '/projects/pdfprocessing.png',
    description:
      'A fully serverless PDF processing pipeline on AWS that compresses PDFs, tracks metadata, monitors performance, and delivers files globally — all without managing a single server. S3 triggers Lambda on file upload, DynamoDB handles metadata tracking, CloudWatch provides real-time monitoring, SNS sends failure alerts, and CloudFront enables global CDN delivery. The deepest learning came through troubleshooting cross-service IAM permissions, DynamoDB Decimal type constraints, and S3-to-Lambda event parsing.',
    services: ['S3', 'Lambda', 'DynamoDB', 'CloudWatch', 'SNS', 'CloudFront'],
  },
  {
    title: 'AWS VPC Architecture',
    image: '/projects/ec2architecture.png',
    description:
      'A VPC architecture built from scratch with proper network isolation and security best practices. Features a public subnet with an internet-facing EC2 instance, a private subnet with a protected instance, Internet and NAT Gateways for controlled traffic flow, and security groups as firewalls. Key takeaways included route table configuration, SSH key management, and understanding gateway-level traffic flow — foundational infrastructure knowledge for enterprise AWS deployments.',
    services: ['VPC', 'EC2', 'Internet Gateway', 'NAT Gateway', 'Security Groups', 'Route Tables'],
  },
  {
    title: 'Enterprise Network Topology',
    image: '/projects/computernetwork.png',
    description:
      'A hierarchical network topology for a five-storey commercial building in Quezon City, following the standard three-layer model: Core, Distribution, and Access layers. The Core Layer provides fast backbone connections between floors, the Distribution Layer handles inter-VLAN routing and security policies via ACLs, and the Access Layer connects 81 end-user devices including computers, printers, servers, access points, and IP phones. Implements HSRP for gateway redundancy, OSPF for dynamic routing with fast convergence, Inter-VLAN Routing for cross-subnet communication, and Trunking for efficient multi-VLAN propagation — ensuring high availability, scalability, and logical segmentation aligned with enterprise best practices.',
    services: ['Cisco Packet Tracer', 'HSRP', 'OSPF', 'Inter-VLAN Routing', 'Trunking', 'VLANs'],
  },
  {
    title: 'BCD Counter Circuit (Spaghetti Wire)',
    image: '/projects/bcd.png',
    description:
      'A hardware BCD (Binary-Coded Decimal) counter built on a breadboard and enclosed in a custom box. The circuit counts in decimal from 0 to 9 using four flip-flops, with a push-button interface for manual stepping. BCD counters are fundamental modulo-10 digital circuits commonly used in digital displays, calculators, and clocks — this hands-on build reinforced core digital logic concepts including sequential logic, binary encoding, and IC interfacing.',
    services: ['Digital Logic', 'Breadboard', 'Flip-Flops', 'BCD Encoding', '7-Segment Display'],
    cover: true,
  },
  {
    title: 'Employee ID Automation System',
    image: '/projects/idautomation.png',
    description:
      'A full-stack employee ID automation platform that streamlines the generation, processing, and distribution of professional ID cards. The system features AI-powered headshot generation via BytePlus Seedream, automatic background removal using Cloudinary AI with Remove.bg as a fallback, and client-side PDF rendering through html2canvas and jsPDF for print-ready ID exports. Authentication is handled through Lark SSO (OAuth 2.0 + PKCE) for employees and session-based auth with bcrypt for HR administrators. Real-time employee record syncing and status tracking are managed through Lark Bitable, with automated notifications routed via Lark Messaging. The backend runs on FastAPI with Uvicorn, exposing RESTful endpoints for submission, AI processing, and dashboard access. Frontend uses Jinja2 server-rendered templates with responsive CSS and vanilla JavaScript for live ID previews and form handling.',
    services: ['FastAPI', 'Lark SSO', 'BytePlus Seedream', 'Cloudinary AI', 'Lark Bitable', 'jsPDF', 'html2canvas'],
  },
];
