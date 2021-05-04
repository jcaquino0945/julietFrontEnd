import { Component, OnInit } from '@angular/core';
import { cmsAbout } from '../../models/cms-about';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from 'src/app/services/cms.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  about$: cmsAbout[];
  aboutForm: FormGroup;
  errMess: string;
  constructor(
    private cms: CmsService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.cms.getAboutUsDetails().subscribe(
      (about$) => (this.about$ = about$),
      (errmess) => (this.errMess = <any>errmess)
    )
    this.aboutForm = this.formBuilder.group({
      about: [null, Validators.required],
    })

  }

  updateAboutUsDetails(id) {
    console.log(this.aboutForm.value)
    this.cms.updateAboutUsDetail(id,this.aboutForm.value)
    .subscribe(
      (res: any) => {
        if (res) {
          window.alert('About Us Details Updated!')
          console.log(this.aboutForm.value)
          console.log(id)
        }
      },
      (err: any) => {
        console.log(err);}
    );
    
    this.cms.getAboutUsDetails().subscribe(
      (about$) => (this.about$ = about$),
      (errmess) => (this.errMess = <any>errmess)
    )
  }

}
