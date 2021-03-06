import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../../shared/services/article.service';
import { ArticleOfStore } from '../../shared/models';

@Component({
  selector: 'app-item-edit',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  id: string;
  image: FileList = null;
  previewImageSrc: string;
  hasImageEdited: boolean = false;
  hasValueSet: boolean;
  imageSrc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private articleService: ArticleService,
    private route: Router
  ) {}

  formValue: FormGroup = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    contents: this.fb.control('', [Validators.required])
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.articleService.getArticle(this.id).subscribe(article => {
        this.patchFormValue(article);
        this.imageSrc = article.imageSrc;
        this.hasValueSet = true;
      });
    });
  }

  private patchFormValue(article: ArticleOfStore) {
    this.formValue.setValue({
      title: `# ${article.title}`,
      contents: article.contents
    });
    return this.formValue;
  }

  onImageUpload(event: Event): void {
    console.log(event);

    this.hasImageEdited = true;
    // tslint:disable-next-line: no-string-literal
    this.image = event.target['files'];
  }

  async onSubmit() {
    if (this.hasImageEdited) {
      await this.articleService.updateArticle(
        this.id,
        this.formValue.value,
        this.image
      );
    } else {
      await this.articleService.updateArticle(this.id, this.formValue.value);
    }
    this.route.navigateByUrl('/admin/dashboard');
  }
}
