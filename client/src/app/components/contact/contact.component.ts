import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  username;
  address;
  phone;
  email;
  form;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
      ) {
      this.createNewBlogForm(); // Create new blog form on start up
       }

       createNewBlogForm() {
         this.form = this.formBuilder.group({
           // name field
           address: ['', Validators.compose([
             Validators.required
           ])],
           phone: ['', Validators.compose([
             Validators.required
           ])],
           email: ['', Validators.compose([
             Validators.required
           ])]
         })
       }

       onBlogSubmit() {
       this.address = this.form.get('address').value;
       this.phone = this.form.get('phone').value;
       this.email = this.form.get('email').value;
       }

  ngOnInit() {
  // Get profile username on page load
  this.authService.getProfile().subscribe(profile => {
    this.username = profile.user.username; // Used when creating new blog posts and comments

  });
  if(this.username != "owner"){
  this.address = "4321 California St,San Francisco, CA 12345";
  this.phone = "123 456 1234";
  this.email = "info@company.com";
  }
  }

}
