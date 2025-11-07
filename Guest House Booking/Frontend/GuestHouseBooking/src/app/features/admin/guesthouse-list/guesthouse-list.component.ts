import { Component, OnInit } from '@angular/core';
import { GuesthouseService } from '../../../core/services/guesthouse.service';
import { Observable } from 'rxjs'; // We will use the 'async' pipe

@Component({
  selector: 'app-guesthouse-list',
  templateUrl: './guesthouse-list.component.html',
  styleUrls: ['./guesthouse-list.component.css']
})
export class GuesthouseListComponent implements OnInit {
  
  // --- THIS IS THE FIX ---
  // We initialize it as 'null' to satisfy TypeScript's strict mode.
  // The 'async' pipe in the HTML file knows how to handle 'null'.
  public guestHouses$: Observable<any[]> | null = null;
  // --- END OF FIX ---
  
  public error: string | null = null;

  constructor(private guesthouseService: GuesthouseService) { }

  ngOnInit(): void {
    this.loadGuestHouses();
  }

  loadGuestHouses(): void {
    this.guestHouses$ = this.guesthouseService.getGuestHouses();
    
    // Simple error handling for now
    this.guestHouses$.subscribe({
      // We don't need a 'next' handler because the async pipe does it
      error: (err) => {
        console.error(err);
        this.error = "Failed to load guest houses. Are you logged in and is the API running?";
      }
    });
  }
}