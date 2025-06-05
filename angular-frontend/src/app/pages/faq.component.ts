import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  
  toggleFaq(event: any): void {
    const question = event.target.closest('.faq-question');
    const answer = question.nextElementSibling;
    const icon = question.querySelector('.faq-icon');
    
    // Toggle active class
    question.classList.toggle('active');
    answer.classList.toggle('active');
  }
}
