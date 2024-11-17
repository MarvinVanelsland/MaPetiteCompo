# README: Ma Petite Compo

## Description

**Ma Petite Compo** is a dynamic web application designed to help users create and visualize football team compositions. This project provides an interactive interface where users can select players, define formations, and view their team's lineup on a virtual field.

---

## Features

1. **Team Formation:**
   - Users can specify a formation (e.g., 433, 442 ...) in an input field.
   - Players are distributed into positions such as Goalkeeper, Defender, Midfielder, and Forward.

2. **Dynamic Field Layout:**
   - A virtual football field displays the selected players organized by their roles.
   - Clicking on players from the list on the left will add them to the team's composition.

3. **Match Sheet:**
   - Automatically updates with the selected team and formation.
   - Displays a summary in a table format showing the number of players in each position.
   - Includes a validation icon to indicate if the team composition is complete.

4. **Interactive Interface:**
   - Uses JavaScript to handle dynamic user interactions.
   - Clicking on a player from the list adds them to the field and the team's composition.
   - The `OK` button processes the user-defined formation and updates the display.

5. **Card Management:**
   - Clicking on a player's name in the match sheet allows you to assign one or more cards (e.g., yellow or red), which will be displayed on the field.

6. **Team Captain Selection:**
   - A dropdown menu allows users to select a team captain.

7. **Gender-Specific Teams:**
   - A button below the player list allows you to switch between male and female team compositions.

---

## File Structure

- **HTML:**  
  The main file (`index.html`) structures the web page and provides placeholders for dynamic content.

- **Styles:**
  - `mpc.css`: Defines the primary styles for the application.  
  - `style_ajouts.css`: Contains additional styling for customization.

- **Scripts:**  
  - `women.js` and `men.js`: Include predefined data for player lists.  
  - `projet2023+option.js`: Implements the logic for dynamic functionality, including updating formations, handling cards, and enabling other features.

- **Images:**  
  - `notok.png`: Indicates an incomplete or invalid team sheet.
  - Player images used for visual representation.

---

## How to Use

1. **Load the Application:**
   Open the `index.html` file in a web browser (preferably Firefox).

2. **Set Formation:**
   Enter a football formation (e.g., 442) in the input field provided under "formation" and click the `OK` button.

3. **Select Players:**
   Choose players from the player pool on the left by clicking on their names. This adds them to the field and the match sheet.

4. **Organize the Team:**
   Players will automatically appear in their respective roles (Goalkeeper, Defender, Midfielder, Forward) based on the selected formation.

5. **Check Match Sheet:**
   Review the match sheet to ensure the team composition is valid. The table will update dynamically to show the number of players in each position.

6. **Select a Captain:**
   Use the dropdown menu below the field to assign a team captain.

7. **Manage Cards:**
   Click on a player's name in the match sheet to assign yellow or red cards, which will appear on the field.

8. **Switch Gender:**
   Use the button below the player pool to toggle between male and female players.

9. **Substitute Players:**
   Click on a player already on the field to remove them, then select a replacement from the player pool.

---


## Credits

- **Project Author:** Marvin Vanelsland

This project was developed as part of the **TW1 2023** course.
