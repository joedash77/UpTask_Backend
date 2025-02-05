import { CorsOptions } from 'cors'

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]

        if(process.argv[2] === '--api') {
            whitelist.push(undefined) // Permitir solicitudes sin origen
        }
        if(!origin || whitelist.includes(origin)) {
            callback(null, true) // Permitir acceso
        } else {
            callback(new Error('Error de CORS: Origen no permitido'))
        }
    }
}