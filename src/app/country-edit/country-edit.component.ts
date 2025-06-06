import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CountryPopulation } from '../country-population';
import { Country } from '../country';

@Component({
  selector: 'app-country-edit',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent implements OnInit{
  form!: FormGroup;
  public country: Country | undefined;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      iso2: new FormControl("", Validators.required),
      iso3: new FormControl("", Validators.required)
    });

    this.loadData();
  }
  constructor(private http: HttpClient,private activatedRoute : ActivatedRoute) {}

  loadData() {
      let id = this.activatedRoute.snapshot.paramMap.get("id");
      this.http.get<Country>(`${environment.baseUrl}api/Countries/${id}`).subscribe({
        next: result => {
          this.country = result;
          this.form.patchValue(result)
        },
        error: error => console.error(error)
      });
  
   }

  onSubmit() {

  }
}
