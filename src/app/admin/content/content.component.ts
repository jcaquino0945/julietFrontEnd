import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CmsService } from '../../services/cms.service';
import { CMS } from '../../models/cms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  ribbons$: CMS[];
  cmsForm: FormGroup;
  errMess: string;
  product$: Product[]
  ribbonForm: FormGroup;
  ribbon;
  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private ribbonService: CmsService
  ) { }

  ngOnInit(): void {
    this.ribbonService.getRibbons().subscribe(
      (ribbons$) => (this.ribbons$ = ribbons$),
      (errmess) => (this.errMess = <any>errmess)
    );
    
    this.ribbonForm = this.formBuilder.group({
      ribbon: [null, Validators.required],
    })
   
  }

  updateRibbon(id) {

  }

}
