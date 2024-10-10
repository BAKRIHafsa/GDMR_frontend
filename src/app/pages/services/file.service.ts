import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'; // Assurez-vous d'importer votre service d'authentification

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  downloadFile(filename: string) {
    const token = this.authService.getToken(); // Récupérez le token JWT
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`http://localhost:8080/uploads/${filename}`, { headers, responseType: 'blob' });
  }
}
