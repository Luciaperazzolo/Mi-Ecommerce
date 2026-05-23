const crypto = require('crypto');
const db = require('../db/database');

// Función para hashear contraseñas con crypto (sin dependencias extra)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

const authController = {

    // POST /register - Guardar usuario
    postRegister: (req, res) => {
        const { name, lastname, email, password } = req.body;

        // Validaciones del servidor
        if (!name || !lastname || !email || !password) {
            return res.render('pages/register', {
                layout: false,
                error: 'Todos los campos son obligatorios.'
            });
        }

        // Verificar si el email ya está registrado
        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existing) {
            return res.render('pages/register', {
                layout: false,
                error: 'Ya existe una cuenta con ese email.'
            });
        }

        // Guardar el usuario
        const passwordHash = hashPassword(password);
        const fullName = `${name} ${lastname}`;

        try {
    db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
      .run(fullName, email, passwordHash);
    res.redirect('/login?registered=true');
} catch (err) {
    console.error('ERROR AL REGISTRAR:', err.message);
    res.render('pages/register', {
        layout: false,
        error: 'Error: ' + err.message
    });
}
    },

    // POST /login - Iniciar sesión
    postLogin: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('pages/login', {
                layout: false,
                error: 'Completá todos los campos.'
            });
        }

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.render('pages/login', {
                layout: false,
                error: 'Email o contraseña incorrectos.'
            });
        }

        const passwordHash = hashPassword(password);
        if (user.password_hash !== passwordHash) {
            return res.render('pages/login', {
                layout: false,
                error: 'Email o contraseña incorrectos.'
            });
        }

        // Guardar usuario en sesión
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect('/');
    },

    // GET /logout - Cerrar sesión
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;
