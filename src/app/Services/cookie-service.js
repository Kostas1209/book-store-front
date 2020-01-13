export function saveCookie(accessToken , refreshToken ){

    if (accessToken != undefined)
    {  
        document.cookie = `access=${accessToken}; max-age=${5*60}; path=/`;
    }
    if (refreshToken != undefined)
    {
        document.cookie = `refresh=${refreshToken}; max-age=${24*60*60}; path=/`;
    }
}

export function isAuthorized(){
    return getToken("refresh") != undefined; 
}

export function getToken(name) {

    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export function deleteToken(name){

    if (name == "access" || name == "refresh")
    {
        document.cookie = `${name}=""; max-age=-1; path=/`;
    }
}