// FILE: app.js
// PURPOSE: Demonstrate Express + Handlebars fundamentals
// TEACHING POINTS: Context passing, helpers, layouts, partials

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

// ============================================
// HANDLEBARS CONFIGURATION
// ============================================
// Configure express-handlebars as the view engine
app.engine('handlebars', engine({
  defaultLayout: 'main',              // Uses views/layouts/main.handlebars by default
  extname: '.handlebars',             // Template file extension
  partialsDir: ['views/partials/'],   // Directory for reusable template fragments
  helpers: {
    // SECTION HELPER: Allows child templates to define content blocks
    // that can be rendered in specific areas of the layout
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ============================================
// ROUTE 1: DEMONSTRATE RENDER CONTEXT
// ============================================
// Teaching: How to pass data from routes to templates
app.get('/', (req, res) => {
  try {
    // Context object - all properties accessible in template using {{propertyName}}
    const context = {
      pageTitle: 'Welcome to Handlebars Tutorial',
      instructor: 'Your Name',
      courseCode: 'INF653',
      isActive: true,
      isHomePage: true
    };
    
    // Render home.handlebars with the context data
    res.render('home', context);
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).send('Error rendering page');
  }
});

// ============================================
// ROUTE 2: DEMONSTRATE BUILT-IN HELPERS
// ============================================
// Teaching: {{#each}}, {{#if}}/{{else}}, {{#unless}}
app.get('/students', (req, res) => {
  try {
    // Dataset demonstrating conditional and iteration helpers
    const context = {
      pageTitle: 'Student Records',
      students: [
        { name: 'Alice', score: 85, passed: true },
        { name: 'Bob', score: 72, passed: true },
        { name: 'Charlie', score: 45, passed: false }
      ],
      hasStudents: true,
      showFailedWarning: false,
      isHomePage: false
    };
    
    // Render students.handlebars with the context data
    res.render('students', context);
  } catch (error) {
    console.error('Error rendering students page:', error);
    res.status(500).send('Error rendering page');
  }
});

// ============================================
// ERROR HANDLING: 404 NOT FOUND
// ============================================
app.use((req, res) => {
  res.status(404).render('home', {
    pageTitle: '404 - Page Not Found',
    instructor: 'N/A',
    courseCode: 'N/A',
    isActive: false,
    error404: true
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   Handlebars Tutorial Server Running      ║
╠════════════════════════════════════════════╣
║   http://localhost:${PORT}                    ║
║                                            ║
║   Routes:                                  ║
║   - GET /           (Render Context)       ║
║   - GET /students   (Built-in Helpers)     ║
╚════════════════════════════════════════════╝
  `);
});
