# Guide d'utilisation du Formulaire de Sondage Multi-étapes

## 📋 Vue d'ensemble

Ce formulaire de sondage est une application Next.js avec validation en multi-page utilisant **Zod** pour la validation côté serveur et **Zustand** pour la gestion d'état persistant.

## 🎯 Fonctionnalités principales

### ✅ Validation multi-page avec Zod

- **Étape 1** : Informations sur l'entreprise (4 champs texte)
- **Étape 2** : Niveau d'automatisation (radio buttons + checkboxes)
- **Étape 3** : Effets de l'automatisation (échelle 1-5 + impacts)
- **Étape 4** : Freins et limites (obstacles + compétences locales)
- **Étape 5** : Perspectives et recommandations (textarea x2)

### 🔄 Persistence des données

- Les données sont sauvegardées dans les **cookies** du serveur
- Le store **Zustand** avec `persist` middleware maintient l'état côté client
- Les données sont conservées pendant 24 heures
- Possibilité de modifier les réponses à chaque étape

### 📊 Page de revue complète

- Vue d'ensemble de toutes les réponses
- Boutons "Modifier" pour chaque section
- Confirmation avant soumission finale
- Design responsive et lisible

### 🎨 Interface utilisateur

- Barre de progression en haut de chaque page
- Navigation fluide avec animations (Framer Motion)
- Gestion complète des erreurs de validation
- Messages d'erreur explicites

### 📱 Responsive Design

- Interface adaptée aux mobiles et desktops
- Composants UI basés sur Radix UI et Tailwind CSS

## 🔧 Architecture technique

```
app/form/
├── 01/              # Informations entreprise
│   ├── page.tsx
│   └── actions.ts
├── 02/              # Automatisation
│   ├── page.tsx
│   └── actions.ts
├── 03/              # Effets
│   ├── page.tsx
│   └── actions.ts
├── 04/              # Freins
│   ├── page.tsx
│   └── actions.ts
├── 05/              # Recommandations
│   ├── page.tsx
│   └── actions.ts
├── review/          # Page de revue
│   └── page.tsx
├── success/         # Page de succès
│   └── page.tsx
├── layout.tsx       # Layout avec barre de progression
└── page.tsx         # Accueil du formulaire

src/
├── shema.ts         # Schémas Zod pour validation
├── store/
│   └── formStore.ts # Store Zustand persistant
└── types/
    └── form-type.ts # Types TypeScript

components/
├── FormRadioGroup.tsx
├── FormCheckboxGroup.tsx
├── FormToggleField.tsx
├── NextBtn.tsx
├── PrevBtn.tsx
└── FormDataLoader.tsx
```

## 🚀 Comment ça marche

### 1. **Remplir une étape**

- L'utilisateur remplit les champs du formulaire
- Clique sur "Suivant"
- Les données sont validées côté serveur avec Zod
- Si validation OK : redirection à l'étape suivante + sauvegarde en cookie
- Si erreurs : affichage des erreurs + maintien sur la même page

### 2. **Modifier une réponse**

- À chaque étape, les données précédentes sont chargées via `defaultValue`
- L'utilisateur peut modifier et renvoyer
- Le bouton "Précédent" le ramène à l'étape précédente

### 3. **Page de revue**

- L'utilisateur voit toutes ses réponses formatées
- Peut cliquer "Modifier" pour revenir sur une étape spécifique
- Peut cliquer "Confirmer et valider" pour soumettre définitivement

### 4. **Soumission**

- Les données sont envoyées via l'API `/api/form/submit`
- Redirection vers page de succès avec animation
- Les cookies sont nettoyés après soumission réussie

## 📝 Fichiers clés à modifier

### Schémas Zod (`src/shema.ts`)

```typescript
export const stepOneSchema = z.object({
  company_name: z.string().min(3, "Message d'erreur"),
  // ...
});
```

### Store Zustand (`src/store/formStore.ts`)

```typescript
interface FormData {
  company_name?: string;
  // ... tous les champs
}

export const useFormStore = create<FormStore>()(
  persist((set) => ({ ... }), { name: "form-storage" })
);
```

### Actions serveur (`app/form/XX/actions.ts`)

```typescript
export const stepXFormAction = async (prevState, formData) => {
  // 1. Récupérer et valider les données
  // 2. Sauvegarder en cookie
  // 3. Rediriger vers l'étape suivante
};
```

## 💾 Sauvegarde des données

### Côté Client (Zustand)

```typescript
const { data, updateData } = useFormStore();
```

### Côté Serveur (Cookies)

```typescript
const cookieStore = await cookies();
cookieStore.set("formData", JSON.stringify(updatedFormData), {
  maxAge: 60 * 60 * 24,
});
```

### API Backend

```typescript
// POST /api/form/submit
// Envoyer les données à votre base de données
```

## 🔐 Validation

### Client-side

- Props TypeScript sur les composants
- Affichage préalable des erreurs (optionnel)

### Server-side (recommandé ✅)

- Validation Zod stricte
- Messages d'erreur personnalisés
- Gestion des erreurs de réseau

## 📋 Checklist de configuration

- [ ] Vérifier que tous les imports `@/` pointent vers les bons fichiers
- [ ] Configurer la base de données pour `POST /api/form/submit`
- [ ] Tester la persistence des cookies entre navigations
- [ ] Vérifier les validations Zod correspondent aux besoins
- [ ] Adapter les messages d'erreur en français
- [ ] Tester sur mobile
- [ ] Ajouter logging des soumissions de formulaire

## 🐛 Dépannage

### Les données ne persistent pas

- Vérifier que Zustand persist middleware est activé
- Vérifier que les cookies ne sont pas bloqués
- Vérifier les logs dans les DevTools

### Erreurs de validation

- Vérifier les schémas Zod dans `src/shema.ts`
- Vérifier que les noms des champs correspondent entre formulaire et schéma
- Consulter les erreurs retournées par `safeParse()`

### Navigation qui ne fonctionne pas

- Vérifier que `useRouter()` est utilisé en client-side (`"use client"`)
- Vérifier les chemins `/form/01`, `/form/02`, etc.

## 📊 Prochaines étapes

1. **Intégrer une base de données** (PostgreSQL, MongoDB, etc.)
2. **Ajouter une authentification** pour tracer qui remplit le formulaire
3. **Exporter les données** en CSV ou PDF
4. **Ajouter des questions conditionnelles** basées sur les réponses précédentes
5. **Intégrer un système d'email** pour confirmation

---

**Auteur** : Formulaire automatisé
**Version** : 1.0
**Dernière mise à jour** : 12 novembre 2025
