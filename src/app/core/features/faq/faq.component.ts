import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AosBaseComponent } from '../../base/aos.base.component';
import { AosService } from '../../../services/aos.service';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

@Component({
  selector: 'app-faq',
  standalone: false,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent extends AosBaseComponent {
  faqs: FAQCategory[] = [
    {
      category: 'General',
      questions: [
        {
          q: 'What areas do you serve?',
          a: 'We primarily serve Kallumpuram and surrounding areas. However, we are open to discussing projects in nearby locations. Contact us to confirm if we can serve your area.',
        },
        {
          q: 'How long does a typical construction project take?',
          a: 'Timeline varies based on project scope. A typical 1500 sq ft house takes 6-8 months from foundation to completion. Renovation projects typically take 2-4 months. We provide detailed timelines during the planning phase.',
        },
        {
          q: 'Do you provide warranties on your work?',
          a: 'Yes! We provide a 1-year warranty on workmanship and construction. Specific materials and fixtures come with manufacturer warranties which we help you claim if needed.',
        },
      ],
    },
    {
      category: 'Planning & Approvals',
      questions: [
        {
          q: 'How long does the approval process take?',
          a: 'Panchayath and Municipality approvals typically take 30-45 days. We handle the entire process including documentation, submission, and follow-ups to ensure smooth approval.',
        },
        {
          q: 'What documents are needed for building approval?',
          a: 'You will need: Land ownership documents, Tax receipts, Site survey plan, Architectural plans (which we provide), and ID proofs. We guide you through the complete documentation process.',
        },
        {
          q: 'Can you help with land survey?',
          a: 'Yes, we coordinate with licensed surveyors for accurate site surveys and boundary marking, which is essential for the approval process.',
        },
      ],
    },
    {
      category: 'Cost & Payment',
      questions: [
        {
          q: 'How accurate are your cost estimates?',
          a: 'Our detailed estimates have 95-97% accuracy. We provide itemized quotes with current market rates. Any changes are discussed and approved before implementation.',
        },
        {
          q: 'What is your payment structure?',
          a: 'We follow a milestone-based payment structure: 10% advance, then payments linked to project stages (foundation, walls, roof, finishing). This protects both parties and ensures smooth progress.',
        },
        {
          q: 'Are there any hidden costs?',
          a: 'Absolutely not! We believe in complete transparency. All costs are clearly mentioned in our estimate. Any additional work is discussed, quoted, and approved before execution.',
        },
        {
          q: 'Do you help with home loans?',
          a: "While we don't provide loans, we assist with documentation required for home loan applications and coordinate with bank representatives for site inspections.",
        },
      ],
    },
    {
      category: 'Construction & Materials',
      questions: [
        {
          q: 'What quality of materials do you use?',
          a: 'We use only quality materials from reputed brands. We provide options for standard, premium, and luxury grades, always ensuring durability and value for money.',
        },
        {
          q: 'Can I choose my own materials?',
          a: 'Yes! You have complete freedom to choose materials and brands. We provide recommendations based on experience, but the final choice is always yours.',
        },
        {
          q: 'How do you ensure quality control?',
          a: 'Our engineers conduct daily site visits and quality checks at each construction stage. We maintain strict supervision and use quality testing for critical components like concrete strength.',
        },
        {
          q: 'What happens if there are delays?',
          a: 'We build buffer time into schedules. If delays occur due to our end, we work extended hours to catch up. Weather or approval delays are discussed and timeline adjusted with your agreement.',
        },
      ],
    },
    {
      category: 'Design & Customization',
      questions: [
        {
          q: 'Can I see 3D designs before construction?',
          a: 'Yes! We provide detailed 3D visualizations for both exterior and interior designs. This helps you visualize the final result and make changes before construction begins.',
        },
        {
          q: 'How many design revisions do you allow?',
          a: 'We allow reasonable design revisions during the planning phase. Major changes are welcome until we finalize and begin construction. Post-construction changes are discussed separately.',
        },
        {
          q: 'Do you handle interior design as well?',
          a: 'Absolutely! We provide complete interior design services including modular kitchen, wardrobes, false ceiling, lighting design, and complete furnishing.',
        },
      ],
    },
  ];

  openIndex: string | null = null;
  constructor(@Inject(PLATFORM_ID) platformId: Object, aosService: AosService) {
    super(platformId, aosService);
  }

  toggleFAQ(index: string): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  isOpen(index: string): boolean {
    return this.openIndex === index;
  }
}
