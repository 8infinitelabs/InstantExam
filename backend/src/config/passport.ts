import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    passReqToCallback: true
}, async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log("✅ Perfil recibido desde Google:", profile);

    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    const picture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

    if (!email) {
        return done(new Error('No se pudo obtener un email válido del proveedor de Google.'));
    }

    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            console.log("✅ Nuevo usuario detectado, creando en la base de datos.");
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: email,
                picture: picture
            });
            await user.save();
        } else {
            console.log("✅ Usuario existente encontrado en la base de datos:", user);
            // Actualizar información del usuario
            user.name = profile.displayName;
            user.email = email;
            user.picture = picture;
            await user.save();
        }

        done(null, user); // Enviar el usuario actualizado al controlador
    } catch (error) {
        console.error("❌ Error al guardar el usuario:", error);
        done(error, null);
    }
}));

// Serializar y deserializar
passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
