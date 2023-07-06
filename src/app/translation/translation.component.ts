import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {

  text!: string;
  targetLanguage!: string;
  translation!: string;

  constructor(private translationService: TranslationService) { }

  translate() {
    this.translationService.translate(this.text, this.targetLanguage)
      .subscribe(response => {
        this.translation = response.data.translations[0].translatedText;
      });
  }
}
