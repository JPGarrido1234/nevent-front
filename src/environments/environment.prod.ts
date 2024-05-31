export const environment = {
    production: true,
    apiUrl: 'https://api.nevent.es',
    iss: {
        admin: 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_RxVfOiLMZ'
    },
    test: {
        domain: "dev.nevent.es",
        users: {
            auth: 'https://stg-nevent-user.auth.eu-west-1.amazoncognito.com/login?client_id=7tais7iafodku3dfancvkdpgs6&response_type=token&scope=email+openid+phone&redirect_uri=https://auth.nevent.es/auth/success',
            region: 'eu-west-1',
            userPoolId: 'eu-west-1_SbO4IyY5X',
            userPoolWebClientId: '7tais7iafodku3dfancvkdpgs6'
        },
        admins: {
            auth: 'https://stg-nevent-admins.auth.eu-west-1.amazoncognito.com/login?client_id=5n6i6vmio53dcuth31jaifb3l2&response_type=token&scope=openid+profile+phone&redirect_uri=https://auth.nevent.es/auth/success',
            region: 'eu-west-1',
            userPoolId: 'eu-west-1_21yTFsJLA',
            userPoolWebClientId: '5n6i6vmio53dcuth31jaifb3l2'
        },
        cookie: {
            path: '/',
            origin: 'nevent.local',
            secure: false,
            sameSite: 'Lax',
            maxAge: 86400
        }
    },
    prod: {
        domain: "nevent.es",
        users: {
            auth: 'https://prd-nevent-user.auth.eu-west-1.amazoncognito.com/login?client_id=kp1tiar9s6h878nnslhha0cd2&response_type=token&scope=email+openid+profile&redirect_uri=https://auth.nevent.es/auth/success',
            region: 'eu-west-1',
            userPoolId: 'eu-west-1_z4QcSOvY6',
            userPoolWebClientId: 'kp1tiar9s6h878nnslhha0cd2'
        },
        admins: {
            auth: 'https://prd-nevent-admin.auth.eu-west-1.amazoncognito.com/login?client_id=2ecspahugiotemsm68atjsg7ag&response_type=token&scope=email+openid+profile&redirect_uri=https://auth.nevent.es/auth/success',
            region: 'eu-west-1',
            userPoolId: 'eu-west-1_RxVfOiLMZ',
            userPoolWebClientId: '2ecspahugiotemsm68atjsg7ag'
        },
        cookie: {
            path: '/',
            origin: 'nevent.es',
            secure: true,
            sameSite: 'Lax',
            maxAge: 86400
        },
    },
    domains: {
        admin: ["admin", "scan"],
        user: ["my", "profile"]
    },
    info: {
        terms: 'https://nevent.es/terms/'
    },
    url: {
        profile: 'https://profile.nevent.es',
        profileComplete: 'https://profile.nevent.es/auth/complete',
        admin: 'https://admin.nevent.es',
        adminComplete: 'https://admin.nevent.es/auth/complete'
    },
    sentry: {
        tunnel: "https://api.nevent.es/diagnostics"
    }
};
