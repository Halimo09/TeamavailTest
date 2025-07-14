/**
 * @jest-environment jsdom
 */
const { createDropdown, renderTable } = require("../public/script");

beforeEach(() => {
  document.body.innerHTML = `
    <table>
      <tbody id="tableBody"></tbody>
    </table>
    <button id="saveBtn">Save</button>
  `;
});

test("creates dropdown with options", () => {
  const dropdown = createDropdown(["A", "B"], "B");
  expect(dropdown.options.length).toBe(2);
  expect(dropdown.value).toBe("B");
});

test("renders empty table without crashing", () => {
  renderTable([]);
  const rows = document.querySelectorAll("#tableBody tr");
  expect(rows.length).toBe(0);
});
