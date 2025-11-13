# 🧪 Guide de test du Formulaire

## Tests à effectuer

### 1. Test de validation - Étape 1

- [ ] Soumettre avec un champ vide → Vérifier les erreurs
- [ ] Remplir avec moins de 3 caractères → Vérifier les erreurs
- [ ] Remplir correctement → Doit avancer à l'étape 2
- [ ] Revenir en arrière → Les données doivent être conservées

### 2. Test de validation - Étape 2

- [ ] Ne pas sélectionner de radio → Erreur "Veuillez choisir une réponse"
- [ ] Sélectionner une réponse → Passer à l'étape 3
- [ ] Ne pas sélectionner de checkbox + pas d'autre → Erreur "Veuillez choisir au moins un"
- [ ] Sélectionner une checkbox → OK
- [ ] Activer "Autres" mais ne rien écrire → Erreur ou OK selon validation

### 3. Test de persistence

- [ ] Remplir l'étape 1 → Avancer à l'étape 2
- [ ] Revenir à l'étape 1 → Les données doivent être là
- [ ] Revenir à l'étape 1 → Modifier les données → Avancer à l'étape 2
- [ ] Revenir à l'étape 1 → Les données modifiées doivent être présentes

### 4. Test de la page de revue

- [ ] Remplir jusqu'à l'étape 5 → Les données s'affichent bien
- [ ] Cliquer "Modifier" sur une section → Redirection à l'étape correcte
- [ ] Modifier et retour → Les modifications apparaissent en revue
- [ ] Cliquer "Confirmer et valider" → Page de succès

### 5. Test de la page de succès

- [ ] Vérification du message de succès
- [ ] Vérification de la redirection automatique
- [ ] Vérification du nettoyage des cookies

### 6. Test responsive

- [ ] Tester sur mobile (375px)
- [ ] Tester sur tablet (768px)
- [ ] Tester sur desktop (1920px)
- [ ] Vérifier que tous les éléments sont lisibles

### 7. Test de navigation

- [ ] Bouton "Suivant" fonctionne
- [ ] Bouton "Précédent" fonctionne
- [ ] Barre de progression se met à jour
- [ ] URL change correctement

### 8. Test des erreurs

- [ ] Valider une étape mal remplie → Erreurs affichées
- [ ] Vérifier que les messages d'erreur sont clairs
- [ ] Vérifier que les champs en erreur sont mis en évidence

## Cas d'usage

### Scénario 1: Utilisateur complet

```
1. Accéder à /form/01
2. Remplir l'étape 1 correctement
3. Cliquer Suivant
4. Remplir l'étape 2 correctement
5. Cliquer Suivant
6. ... (étapes 3, 4, 5)
7. Cliquer "Voir le résumé"
8. Vérifier les données en revue
9. Cliquer "Confirmer et valider"
10. Voir la page de succès
```

### Scénario 2: Utilisateur avec erreur

```
1. Remplir l'étape 1 mal
2. Cliquer Suivant
3. Voir les erreurs
4. Corriger
5. Cliquer Suivant → OK
```

### Scénario 3: Utilisateur qui revient

```
1. Remplir étape 1 et 2
2. Revenir à étape 1
3. Vérifier que les données sont toujours là
4. Modifier les données
5. Revenir à étape 2
6. Vérifier que les modifs sont conservées
```

## Données de test

### Étape 1 - Valides

```
Nom entreprise: Société ABC
Fonction: Directeur Technique
Département: Production
Ancienneté: 5 ans
```

### Étape 2 - Valides

```
Procédés automatisés: "Majoritairement"
Types d'automatisation: ["automates-programmables", "systeme-de-controle-monitoring"]
Niveau: "Fort"
```

### Étape 3 - Valides

```
Productivité: "5"
Qualité: "4"
Impacts: ["reduire-les-couts-de-production", "optimiser-la-securite-des-employes"]
```

### Étape 4 - Valides

```
Obstacles: ["couts-eleves-d-investissement"]
Compétences: "oui-largement"
```

### Étape 5 - Valides

```
Recommandation 1: "L'automatisation pourrait améliorer notre capacité de production..."
Recommandation 2: "Le Gabon devrait investir dans la formation professionnelle..."
```

## Points de contrôle

✅ **Avant d'aller en production**

1. [ ] Tous les schémas Zod valident correctement
2. [ ] Tous les messages d'erreur sont en français
3. [ ] Les données sont persistées entre les pages
4. [ ] La page de revue affiche toutes les données
5. [ ] L'API `/api/form/submit` fonctionne
6. [ ] Les cookies sont nettoyés après soumission
7. [ ] La redirection après succès fonctionne
8. [ ] Le responsive design fonctionne
9. [ ] Les animations Framer Motion sont fluides
10. [ ] Les textes sont à jour et sans typos

## Logs à vérifier

### Console navigateur

```
- Aucune erreur TypeScript
- Aucune erreur React
- Aucun warning console
```

### Serveur

```
- Les actions serveur s'exécutent sans erreur
- Les cookies sont bien définis/modifiés
- L'API reçoit correctement les données
```

---

**Estimation de temps de test** : 30 minutes
**Navigateurs à tester** : Chrome, Firefox, Safari, Edge
**Mobiles à tester** : iOS 15+, Android 12+
