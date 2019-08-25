import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  loadedContact: Observable<Contact>;
  currentContactId: number;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(p => {
      // if you happen to change the url bar this will subscribe
      // and reassign the api call, which will refire
      this.currentContactId = +p.get('id');
      this.loadedContact = this.contactService.getContactById(this.currentContactId);
    });
  }

  onCancel(): Promise<boolean> {
    return this.navigateUpOneLevel();
  }

  onSave(contact: Contact): void {
    contact.id = this.currentContactId;
    this.contactService.updateContact(contact).subscribe(x => {
      if (x) {
        // show info that save was successful
        return this.navigateUpOneLevel();
      }
    });
  }

  onDelete(): void {
    this.contactService.deleteContact(this.currentContactId).subscribe(x => {
      return this.navigateUpOneLevel();
    });
  }

  private navigateUpOneLevel(): Promise<boolean> {
    return this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
