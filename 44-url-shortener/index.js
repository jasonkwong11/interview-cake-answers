// Design a URL shortener
// like bit.ly ...

// I.) Step 1 is to scope the project: System design questions
// like this are usually intentionally left open-ended, so
// you have to ask some questions and make sure your
// decisions about exactly what you're building to get on
// the same page as your interviewer.

// What features might we need?

//Example questions for Features:
// 1. Is this a full web app, with a web interface? 
// - No, let's just build an API to start

//2. Since it's an API, do we need authentication or user
//acounts or developer keys?
// -No, lets just make it open to start.

//3. Can people modify or delete links?
// - Let's leave that out for now.

// 4. If people can't delete links... do they persist forever?
// Or do we automatically remove old ones?
  // - First, it's worth considering what policies we
  // use for removing old ones:
  // 1. We could remove links that were created some
  // length of time ago ... like 6 months
  // 2. We could remove links that haven't been visited
  // in some length of time ... like 6 months

// ^^ 2 seems less frustrating than one. but there are many cases
// where 2 could still frustrate users... if a link is on a
// public web, its likely to get hit somewhat regularly
// at least by spiders...  but what if someone printed
// pamphlets that had the url on it? AND Didn't give it out
// for a few months.. then started giving them out again?
// (*more cases of expiration for links breaking not being
// realistic*)
// ===> So we let's let links exist forever

// 5. Should we let people choose their shortlink, or just
// autogenerate it? e.g: they want ca.ke/parkers-resume
// - Let's definitely support that

// 6. Do we need analytics, so people can see how many people
// are clicking on a link, etc?
// ==> good idea but let's leave it out to start

// Step 2: Design Goals
// If we're designing something, we should know what we're 
// optimizing for! What are we optimizing for?

// DESIGN GOALS:
// Here's what we came up with:
// 1. We should be able to store a LOT of links, since we're 
// not automatically expiring them.
// 2. Our shortlinks should be as short as possible. The whole
// point of a link shortener is to make short links! Having
// shorter links than our competition could be a business advantage
// 3. Following a shortlink should be fast
// 4. The shortlink follower should be resilient to load spikes.
// One of our lins might be the top story on Reddit.

// Note: it's worth taking a moment to really think about the order
// of our goals. Someties design goals are at odds with each other
// (to do a better job of one, we need to do a worse job of another)
// So it's helpful to know which goals are more important than others

// Step 3: Building the data model:
// Think about the database schema or the models we'll want.
// What things do we need to store, and how should they relate
// to each other? This is the park where we answer questions like
// "is this a many-to-many or a one-to-many?" or 
// "should these be in the same table or different tables?"

// Database model for a link shortener: 
// It's worthwhile to be careful about how
// we name things. This'll help us communicate
// clearly with our interviewer, and it'll show
// that we care aobut using descriptive and
// consistent names! Many interviewers look
// for this:

// Lets call our main entity a Link. A Link
// is a mapping between a shortLink on our
// site, and a longLink, where we redirect 
// people when they visit the shortLink.

//Link
// - shortLink
// - longLink

// the shortLink could be one we've randomly
// generated, or one a user chose

// of course, we don't need to store the full
// ShortLink URL (e.g.: ca.ke/mysite), we just
// need to store the "slug" -- the part at the
// end (e.g.: "mysite")

//So let's rename the shortLink field to "slug"
// Link 
// - slug
// - longLink

// now longLink doesn't make as much sense
// without shortLink. so lets change it to
// destination:
// Link
// - slug
// - destination

// ** Investing time in carefully naming things
// from the beginning is always impressive
// in an interview. A big part of code 
// readability is how well things are named!

// Step 4: Sketching the Code:
// Don't get hung up on the details here
// pseudocode is fine

//Think of this part as sprinting to a naive
// first draft design, so you and your 
// interviewer can get on the same page and
// have a starting point for optimizing.

// There may be things that come up as you
// go that are clearly "tricky issues"
// that need to be thought through.
// Feel free to skip these as you go --
// just jot down a note to come back to 
// them later.

// Our main goal here is to come up with a
// skeleton to start building things out from
// ** THINK about what endpoints/views we'll
// need, and what each one will have to do.

// Views: one page: form field for destination
// form field for slug, else it's autogenned.

// send a POST request to the server, which will
// create a new Link object, save to db,
// returning a promise
// which resolves to the autogenned slug
// 
//Endpoints: 

// In normal REST style, our endpoint for
// creating a ShortLink should be named
// after the entity we're creating. 
// Versioning apis is also a reasonable 
// thing to do. So let's put our creation
// endpoint at ca.ke/api/v1/shortlink

// To create a new ShortLink, we'll send a
// POST request there. Our POST request
// will include one required argument:
// the destination where our ShortLink
// will point. It'll also optionally
// take a slug argument. If no slug is
// provided, we'll generate one.
// The response will contain the newly-created
// ShortLink, including its slug and
// destination

// In usual REST style, we should allow GET,
// PUT, PATCH, and DELETE requests as well to
// read, modify, and delete links. But since
// that's not a requirement yet, we'll just
// reject non-POST requirements with an 
// error 501("not implemented") for now

//So our endpoint might look something like
// this: (psuedocode):

function shortLink(request) {
  if (request.method !== 'POST') {
    return response(501); // HTTP 501 Not implemented
  }

  var destination = request.data.destination;
  var slug = request.data.slug;

  // if they not included a slug, make a new one
  if (typeof slug === 'undefined') {
    slug = generateRandomSlug();
  }

  DB.insertLink(slug, destination);

  var responseBody = JSON.stringify({'slug': slug});
  return response(200, responseBody);
}

// now we have to define how generateRandomSlug() works:

// 1. What characters can we use in randomly
// generated slugs? More possible characters
// means more possible random slugs without 
// making our shortlinks longer. But what
// characters are allowed in URLs?

// 2. How do we ensure a randomly generated
// slug hasn't already been used? Or if there
// is such a collision, how do we handle it?

// ^^ we'll jot these questions down, put them
// aside, and come back to them after we're 
// done sketching our general app structure

// SECOND, let's make a way to follow a ShortLink
// That's the whole point, after all!

// Our shortened URLs should be as short as possible.
// So as mentioned before, we'll give them this
// format: ca.ke/$slug
// ==> where $slug is the slug (either auto-genned
// by us or specificed by the user).

// We could make it clearer that this is a redirect
// endpoint, by using a format like ca.ke/r/$slug
// but that adds 2 precious characters of length to 
// our shortlink URLs

//**Note: one potential challenge here: if/when
// we build a web app for our service, we'll 
// need some way of differentiating our own
// pages from shortlinks. For example, if we want
// an about page at ca.ke/about, our back-end
// will need to know "about" isn't just a shortlink
// slug. In fact, we might want to reserve or block
// shortlinks for pages we thing we might need, so
// users don't grab URLs we might want for our own
//site. 
//ALTERNATIVELY: we could just say OUR pages
// have paths that're always prefixed with something
// like /w/. For example, ca.ke/w/about

// The code for the redirection endpoint is
// pretty simple:

function redirect(request) {
  var destination = DB.getLinkDestination(request.path);
  return response(302, destination);
}

//SLUG GENERATION:
// A note about methodology: Our default
// process for answering questions like this is
// often "make a reasonable guess, brainstorm
// potential issues and revise." That's fine
// but sometimes it feels more organized and
// imppressived to do something more like:
// "brainstorm design goals, then design
// around those goals".. so we'll do that.

// Remember our design goals:
// 1. We should be able to store a lot of links.
// 2. Our shortlinks should be as short as possible.















