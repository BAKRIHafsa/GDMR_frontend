export interface Creneau {
    id: number;
    date: string;
    heureDebutVisite: string;
    heureFinVisite: string;
    motif: string;
    typeVisite: string;
    statusVisite: string;
    collaborateur: {
      idUser: number;
      nom: string;
      prenom: string;
    };
  }
  