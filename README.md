# Information Security - FreeCodeCamp.org

- [FREECODECAMP. Information Security](https://www.freecodecamp.org/learn/information-security/#information-security-with-helmetjs)


- Courses:

With everything we do online, there's a vast amount of sensitive information at risk: email addresses, passwords, phone numbers, and much more.

With the Information Security Certification, you'll build a secure web app with HelmetJS to learn the fundamentals of protecting people's information online.

You'll also build a TCP client, and an Nmap and port scanner in Python. This will help you learn the basics of penetration testing — an important component of good information security.


## Information Security with HelmetJS

#### Challenges

###### Install and Require Helmet.js

Helmet helps you secure your Express apps by setting various HTTP headers.


- **Nota**:
- [HELMET. Helmet.js Quick Start](https://helmetjs.github.io/)


###### Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express. X-Powered-By: Express is sent in every request coming from Express by default. Use the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.


###### Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()

Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.

The basic rule to lower the risk of an XSS attack is simple: “Never trust user’s input”. As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. <, >.

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.

The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support.


###### Avoid Inferring the Response MIME Type with helmet.noSniff()

Browsers can use content or MIME sniffing to override response Content-Type headers to guess and process the data using an implicit content type. While this can be convenient in some scenarios, it can also lead to some dangerous attacks. This middleware sets the X-Content-Type-Options header to nosniff, instructing the browser to not bypass the provided Content-Type.


###### Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. This middleware sets the X-Download-Options header to noopen. This will prevent IE users from executing downloads in the trusted site’s context.


###### Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()

HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP. By setting the header Strict-Transport-Security, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.



Configure helmet.hsts() to use HTTPS for the next 90 days. Pass the config object {maxAge: timeInSeconds, force: true}. You can create a variable ninetyDaysInSeconds = 90*24*60*60; to use for the timeInSeconds. Replit already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Replit header, after inspecting it for testing.

Note: Configuring HTTPS on a custom website requires the acquisition of a domain, and an SSL/TLS Certificate.


###### Disable DNS Prefetching with helmet.dnsPrefetchControl()

To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination ip is already known when the user clicks on a link. This may lead to over-use of the DNS service (if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not). If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.


Use the helmet.dnsPrefetchControl() method on your server.


###### Disable Client-Side Caching with helmet.noCache()

If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.

Use the helmet.noCache() method on your server.


###### Set a Content Security Policy with helmet.contentSecurityPolicy()

This challenge highlights one promising new defense that can significantly reduce the risk and impact of many type of attacks in modern browsers. By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page. This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more. CSP works by defining an allowed list of content sources which are trusted. You can configure them for each kind of resource a web page may need (scripts, stylesheets, fonts, frames, media, and so on…). There are multiple directives available, so a website owner can have a granular control. See HTML 5 Rocks, KeyCDN for more details. Unfortunately CSP is unsupported by older browser.

By default, directives are wide open, so it’s important to set the defaultSrc directive as a fallback. Helmet supports both defaultSrc and default-src naming styles. The fallback applies for most of the unspecified directives.




In this exercise, use helmet.contentSecurityPolicy(). Configure it by adding a directives object. In the object, set the defaultSrc to ["'self'"] (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the scriptSrc directive so that you only allow scripts to be downloaded from your website ('self'), and from the domain 'trusted-cdn.com'.

- **Hint**: in the 'self' keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working.



###### Configure Helmet Using the `parent` helmet() Middleware

app.use(helmet()) will automatically include all the middleware introduced above, except noCache(), and contentSecurityPolicy(), but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.

Example:

```
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
```

We introduced each middleware separately for teaching purposes and for ease of testing. Using the ‘parent’ helmet() middleware is easy to implement in a real project.


- Note: **no tests - it's a descriptive challenge**


###### Understand BCrypt Hashes

BCrypt hashes are very secure. A hash is basically a fingerprint of the original data- always unique. This is accomplished by feeding the original data into an algorithm and returning a fixed length result. To further complicate this process and make it more secure, you can also salt your hash. Salting your hash involves adding random data to the original data before the hashing process which makes it even harder to crack the hash.

BCrypt hashes will always look like $2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm which does have a structure. The first small bit of data $2a is defining what kind of hash algorithm was used. The next portion $13 defines the cost. Cost is about how much power it takes to compute the hash. It is on a logarithmic scale of 2^cost and determines how many times the data is put through the hashing algorithm. For example, at a cost of 10 you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash... and to take it further, at a cost of 31 it would take multiple days to complete a hash. A cost of 12 is considered very secure at this time. The last portion of your hash $ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm, looks like one large string of numbers, periods, and letters but it is actually two separate pieces of information. The first 22 characters is the salt in plain text, and the rest is the hashed password!



**Add all your code for these lessons in the server.js file between the code we have started you off with. Do not change or delete the code we have added for you.**

BCrypt has already been added as a dependency, so require it as bcrypt in your server.

Submit your page when you think you've got it right.



- **Other Resources for the Project**:
- [DECHALERT, Aphinya. What is Helmet.js & Why it is a Security Best Practice For Express.js, 2021](https://www.securecoding.com/blog/using-helmetjs/)
`MISTRY, Bipin. Fasten your Helmet.js (Part 2): Locking down your Content-Security-Policy. Disponível em: https://www.veracode.com/blog/secure-development/fasten-your-helmetjs-part-2-locking-down-your-content-security-policy. Acessado em 17 de novembro de 2022.`



