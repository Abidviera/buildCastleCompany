export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: string[];
  process: string[];
  images: string[];
  stats: { label: string; value: string }[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'planning',
    title: 'Planning, Contracting & Supervision',
    subtitle: 'Complete Project Management from Start to Finish',
    description: 'Our comprehensive planning and supervision service ensures your construction project runs smoothly from conception to completion. We handle every detail with precision and care, making your building journey stress-free.',
    benefits: [
      'Single point of contact for entire project',
      'Reduced construction time by 30%',
      'Better quality control and workmanship',
      'Cost savings through efficient resource management',
      'Regular progress updates and site visits',
      'Professional contractor coordination'
    ],
    features: [
      'Detailed project timeline and milestones',
      'Quality material sourcing and procurement',
      'Daily site supervision by experienced engineers',
      'Contractor management and coordination',
      'Safety compliance and risk management',
      'Regular client reporting and transparency'
    ],
    process: [
      'Initial site assessment and feasibility study',
      'Comprehensive project planning and scheduling',
      'Contractor selection and management',
      'Daily supervision and quality checks',
      'Progress monitoring and reporting',
      'Final inspection and handover'
    ],
    images: [
      'https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBwbGFubmluZyUyMGJsdWVwcmludHxlbnwxfHx8fDE3NjQ5NjA4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1636414722386-a73bd3fc368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtJTIwd29ya3xlbnwxfHx8fDE3NjQ5NjA4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Projects Supervised', value: '150+' },
      { label: 'Client Satisfaction', value: '98%' },
      { label: 'On-Time Completion', value: '95%' }
    ]
  },
  {
    id: 'estimation',
    title: 'Estimation Services',
    subtitle: 'Accurate Cost Planning for Your Dream Project',
    description: 'Get detailed, transparent, and highly accurate cost estimates for your construction project. Our estimation services help you plan your budget effectively and avoid unexpected expenses, giving you complete financial clarity before breaking ground.',
    benefits: [
      'Detailed itemized cost breakdown',
      'Accurate material quantity calculations',
      'Current market rate analysis',
      'Hidden cost identification',
      'Budget optimization suggestions',
      'Multiple design option comparisons'
    ],
    features: [
      'Comprehensive material quantity takeoff',
      'Labor cost estimation based on current rates',
      'Equipment and machinery cost analysis',
      'Contingency planning for price fluctuations',
      'Alternative material suggestions for cost savings',
      'Detailed Bill of Quantities (BOQ)'
    ],
    process: [
      'Review architectural plans and specifications',
      'Site measurement and verification',
      'Material quantity calculations',
      'Current market rate research',
      'Detailed cost report preparation',
      'Consultation and clarification meeting'
    ],
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBwbGFubmluZyUyMGNhbGN1bGF0b3J8ZW58MXx8fHwxNzY0OTYxNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwbGFubmluZ3xlbnwxfHx8fDE3NjQ5NjE0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Estimates Delivered', value: '200+' },
      { label: 'Accuracy Rate', value: '97%' },
      { label: 'Cost Saved Average', value: '12%' }
    ]
  },
  {
    id: 'approvals',
    title: 'Approval & Completion Drawings',
    subtitle: 'Hassle-Free Panchayath & Municipality Approvals',
    description: 'Navigate the complex world of building permissions with ease. We prepare professional architectural drawings and handle all documentation required for Panchayath and Municipality approvals, ensuring full compliance with local regulations.',
    benefits: [
      'Faster approval process (30-45 days)',
      'Zero rejection rate on submissions',
      'Complete legal compliance',
      'Professional CAD drawings',
      'All documentation handled',
      'Expert guidance on regulations'
    ],
    features: [
      'Detailed architectural plans and elevations',
      'Site plans with boundary details',
      'Structural drawings when required',
      'Plumbing and electrical layouts',
      'Building permit application preparation',
      'Completion certificate documentation'
    ],
    process: [
      'Site survey and boundary verification',
      'Architectural drawing preparation',
      'Documentation compilation',
      'Application submission to authorities',
      'Follow-up and clarifications',
      'Approval certificate collection'
    ],
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZHJhd2luZ3N8ZW58MXx8fHwxNzY0OTYxNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlcHJpbnQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0OTYxNDM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Approvals Secured', value: '180+' },
      { label: 'Success Rate', value: '100%' },
      { label: 'Average Time', value: '35 days' }
    ]
  },
  {
    id: 'interior',
    title: 'Interior & Exterior Designing',
    subtitle: 'Transform Spaces into Beautiful Living Experiences',
    description: 'Our design team creates stunning interiors and exteriors that reflect your personality and lifestyle. From contemporary minimalism to traditional elegance, we bring your vision to life with creativity, functionality, and attention to detail.',
    benefits: [
      'Customized design solutions',
      '3D visualization before execution',
      'Space optimization and functionality',
      'Premium material selection',
      'Lighting and ambiance design',
      'Complete turnkey execution'
    ],
    features: [
      'Concept development and mood boards',
      'Photorealistic 3D renderings',
      'Color scheme and material palette',
      'Furniture and fixture selection',
      'Lighting design and planning',
      'Custom carpentry and millwork'
    ],
    process: [
      'Initial consultation and requirement analysis',
      'Concept design and mood board presentation',
      '3D visualization and client approval',
      'Detailed working drawings',
      'Material procurement and execution',
      'Final styling and handover'
    ],
    images: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NDkxMDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5MTU4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Designs Executed', value: '120+' },
      { label: 'Client Satisfaction', value: '99%' },
      { label: 'On-Budget Delivery', value: '94%' }
    ]
  },
  {
    id: 'renovation',
    title: 'Renovation Work',
    subtitle: 'Breathe New Life into Your Existing Spaces',
    description: 'Transform your old house into a modern dream home with our expert renovation services. We specialize in complete home makeovers, kitchen and bathroom upgrades, structural modifications, and modernization projects.',
    benefits: [
      'Cost-effective than new construction',
      'Minimal disruption to daily life',
      'Structural assessment included',
      'Modern amenities integration',
      'Energy efficiency upgrades',
      'Increased property value'
    ],
    features: [
      'Structural stability assessment',
      'Space reconfiguration and layout changes',
      'Electrical and plumbing upgrades',
      'Modern fixtures and fittings',
      'Waterproofing and dampness treatment',
      'Paint, flooring, and finishing work'
    ],
    process: [
      'Existing structure assessment',
      'Renovation plan and design',
      'Demolition and structural work',
      'Plumbing and electrical updates',
      'Finishing and interior work',
      'Final cleanup and handover'
    ],
    images: [
      'https://images.unsplash.com/photo-1646592491963-07ff7e7c31f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDk0NTE4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1657758481156-fbed1d83e694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIga2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NjA4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Renovations Done', value: '85+' },
      { label: 'Value Increase', value: '35%' },
      { label: 'Time Saved vs New', value: '40%' }
    ]
  },
  {
    id: 'landscaping',
    title: 'Landscaping Services',
    subtitle: 'Create Your Personal Outdoor Paradise',
    description: 'Beautiful landscapes that complement your home perfectly. From lush gardens to modern outdoor living spaces, we design and create outdoor environments that enhance your property\'s beauty and your quality of life.',
    benefits: [
      'Increased property value',
      'Enhanced curb appeal',
      'Eco-friendly solutions',
      'Low maintenance options',
      'Outdoor living spaces',
      'Seasonal planning'
    ],
    features: [
      'Garden design and layout planning',
      'Plant selection for local climate',
      'Irrigation system design',
      'Outdoor lighting solutions',
      'Pathways and paving work',
      'Water features and focal points'
    ],
    process: [
      'Site analysis and soil testing',
      'Landscape design and concept',
      'Plant and material selection',
      'Site preparation and grading',
      'Planting and hardscape installation',
      'Maintenance guidance and handover'
    ],
    images: [
      'landscaping.webp',
      'https://images.unsplash.com/photo-1595387426256-cc153122a6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY0OTU0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    stats: [
      { label: 'Landscapes Created', value: '60+' },
      { label: 'Property Value Add', value: '15%' },
      { label: 'Eco-Friendly Projects', value: '100%' }
    ]
  }
];