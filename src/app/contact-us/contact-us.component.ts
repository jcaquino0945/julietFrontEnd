import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { RibbonService } from '../services/ribbon.service';
import { FooterService } from '../services/footer.service';
import { ResponsiveService } from '../services/responsive.service';
import { ContactService } from '../services/contact.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/contact';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  messages$: Contact[];
  errMess: string;
  name = '';
  message = '';
  email = '';
  contactNumber = '';
  contactForm: FormGroup;
  saveSuccess: boolean;

  public isMobile: Boolean;
  constructor(
    public nav: NavbarService,
    public ribbon: RibbonService,
    public footer: FooterService,
    private responsive: ResponsiveService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      contactNumber: [null, Validators.required],
      message: [null, Validators.required],
    });
    this.nav.show();
    this.ribbon.show();
    this.footer.show();

    this.onResize();
    this.responsive.checkWidth();
  }

  onResize() {
    this.responsive.getMobileStatus().subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
  onFormSubmit() {
    try {
      this.contactService.sendMessage(this.contactForm.value)
      this.saveSuccess = true 
      this.contactForm.reset()
    } catch (error) {
      window.alert('error sending message!')
    }
  }
}
