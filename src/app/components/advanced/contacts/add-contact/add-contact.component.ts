import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

import { ContactService } from '../../../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
  ) { }

  ngOnInit() {
  }

  onSave(contact: Contact): void {
    this.contactService.insertContact(contact).subscribe(result => {
      // with the contact back from the api
      // we can show success and navigate back to search
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    });
  }

  onCancel(): Promise<boolean> {
    return this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
