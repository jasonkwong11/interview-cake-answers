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

// Looking at a few examples, we can quickly
// notice that the more characters we allow
// in our shortlinks, the more different
// ShortLinks we can have without making our
// ShortLinks longer. Specifically, if we 
// allow c different characters, for n-character-long
// slugs, we have c^n distinct possibilities.

//How did we get that math?
// We drew out a few examples and looked for
// patterns.

// It helps to start out with small numbers.
// Suppose we only allowed 2 different characters
// for our slugs 'a' and 'b'. How many possible
// 1-character slugs would we have?
// ==> 2: 'a' and 'b'

// How many possible 2-character slugs? Well,
// we have 2 possibilies for the first char,
// and for each of those 2 possible first chars
//, we have 2 possible second characters.
// That's 2*2 = 4 possibilities overall.

// How many possible 3-char slugs?
// 2 possibilities for the first char, and for
// each of those 2 possible first chars, we
// have 2 possible second chars, and for each
// of those possible first and second chars,
// another 2 possible third chars.
// That's 2*2*2 = 8 possibilities overall.

// ==> generalize it: we have 2^n possible
// n-character slugs, if we only allow 2
// possible choices (a and b) for each char

// And if we want to allow c different possible
// chars, instead of just 2? c^n possiblies 
// for an n-char-long slug

//>> SO if we're trying to accommodate as 
// many slugs as possible, we should allow
// as many chars as we can!

// ... let's do this:
// 1. figure out the max set of chars we can
// allow in our random shortlinks

// 2. figure out how many distinct shortlinks
// we want to accommodate

// 3. figure out how long our shortlinks must
// be to accommodate that many distinct possibilities

//***NOTE: sketching a process like this before
// jumping in is hugely impressive. It shows
// organized, methodical thinking. Whenever
// you're not sure how to proceed, take a step
// back and try to write out a process for 
// getting to the bottom of things. It's fine
// if you end up straying from your plan-- it'll
// still help you organize your thinking.

//WHAT CHARACTERS CAN WE ALLOW IN OUR RANDOMLY
// GENERATED SLUGS?

// What are the constraints on c? Let's think
// about it:

// 1. we should only use chars that are actually
// allowed in URLs
// 2. We should probably only pick chars that
// are relatively easy to type on a keyboard
// Remember the use case we talked about where
// poeple are tyrping in a ShortLink they're 
// reading off a piece of paper


// So what characters are allowed in URLs? It's
// ok not to know the answer off the top of 
// your head. but you should be able to 
// tell your interviewer that you know how to
// figure it out. Googling or searching on 
// Stack OVerflow is a fine answer.
// It's even cooler to say: "I'm sure this is
// defined in an RFC somewhere"

/*
RFC = "request for comments". The first ones are 
form 1969 back in the day of ARPANET, the precursor to the internet.

RFC's define lots of convention for how internet
communications work.

It turns out the answer is "only alphanumerics,
the special chars: $-_.+!*'()," and 
reserved characters used for their reserved
purpose may be used unencoded within a url.
Reserved chars with reserved purposes are 
characters like ? which marks the beginning
of a query string and # which marks the
beginning of a fragment/anchor
  ... we definitely shouldn't use these

So just alphanumerics and the special chars
are allowed.

On the path portion of a URL, it's case-sensitive.
  ... so ca.ke/foo and ca.ke/Foo are two different docs

In fact, in keeping with point 2 above about
ease of typing, lets pull all the special
characters from our list. It seems like a 
small lost on character count (8 chars)in
exchange for a big win on readability and
typeability. If we find ourselves wanting
those extra chars, we can add 'em back in

AH BUT WHAT IF a USER wants to specify
her own slug? she might want to use
underscores, or dashes, or parentheses
so let's say for user-specified slugs,
we allow "$-_.+!*()," still no apostrophe.

Regarding making URLs easy to type:
  - we might want to consider constraining
  our character set to clear up common
  ambiguities. for example: not allowing
  both uppercase letter O and the number 0.
  or lowercase letter l and the number 1.

  Font choice can help reduce these ambiguities, 
  but we don't have any control over the fonts ppl
  use to display our shortlinks. This is 
  worthwhile consideration, but at the moment
  it's adding complexity to a question we're
  still trying to figure out...
    ... so lets just mention it and say: "this
    is something we want to keep an eye on for later
    but lets put it aside for now." Your interviewer
    understands thaty you can't accommodate everything
    in your initial design but she'll appreciate 
    you showing an ability to anticipate what problems
    may come up in the user experience.


Okay, so with a-z, A-Z, and 0-9, we have
26 + 26 + 10 = 62 possible chars in our
randomly-generated slugs. And for user-genned
slugs, we have another 10 chars for 72 total

HOW MANY DISTINCT SLUGS DO WE NEED?

about how many slugs do we need to be able to 
accommodate? This is a good question to ask
your interviewer. She may want you to make
a reasonable choice yourself. There's no one
right answer; the mportant thing is to show
some organized thinking.


Here's one way to come up with a ballpark
estimate: about how many new slugs might we
create on a busy day? Maybe 100 per minute?
Hard to imagine more than that. Thats
100*60*24 about 145 thousand new links a day

52.5 million a year. Whats a number of years
that feels like 'almost forever' I'd say 100.
So that's 5.2 trillin slugs. That seems
sufficiently large. It's pretty dependent
on the accuracy of our estimate of 100 per
minute. But it seems to be a pretty reasonable
ceiling and a purposefully high one.

If we can accommodate that many slugs, we expect
we'll be able to keep handing out random slugs
effectively indefinitely.

HOW SHORT CAN WE MAKE OUR SLUGS WHILE STILL
GETTING ENOUGH DISTINCT POSSIBILITIES???

Let's return to the formula we came up with 
before: with a c-character-long alphabet
and slugs of length n, we get c^n possible
slugs. We want ~5 trillion possible slugs

and we decided on a 62-char alphabet, so
62^n about equal to 5 trillion. We just
have to solve for n.
... we might know that we need to take
a logarithm to solve for n. but even if
we know that, this is a tricky thing to
eyeball

if we're in front of a computer of phone 
we can just plug it in to wolfram alpha.
Turns out the answer is about 7.09
... so 7 chars gets us most of the way to our
target number of distinct possibilities

It's worth checking how many chars we could
save by allowign the special chars. 
so 72^n = 5.2 trillion. we get n is about 6.8

so it's not worth including the special chars

So lets stick with out first instinct to 
remove those special chars for readability
purposes and let's choose 7 chars for our slugs

For some added potential brevity, and some 
added random slugs, we could also allow
for random slugs with fewer than 7 chars

How many additional random slugs would that
get us?
  - If you're a whiz with mathematical series
  you might know intuitively that the sum of
  these fewer than 7 character slugs will
  be far less than the 7 char slugs.
  We can actually compute this to confirm.

  62^6 (for 6-char slugs) plus 62^5 (for 5-char
  slugs) ... about 57 billion random slugs.
  Which isn't that much in comparision to
  5.2 trillion -- it's two orders of magnitude
  less. Since this doesn't win us much
  let's skip it!

  One interesting lesson here: going from
  6 chars to 7 chars gave us a two orders
  of magnitude leap in our number of possible
  slugs. going from 7 chars to 8 should have
  an even more dramatic effect... so if when
  we do start running out of 7 char random 
  slugs, allowing just 1 more char will dramatically
  push back the point where we run out of random slugs

SO now we know the chars we'll use for slugs
and we know how many chars we'll use.
NEXT: HOW do we GENERATE A RANDOM SLUG?

We could just make a random choice for each char:

*/

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function generateRandomSlug() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var numChars = 7;
  var result = "";

  for (var i = 0; i < numChars; i++) {
    var randomIndex = getRandom(0, alphabet.length - 1);
    result += alphabet[randomIndex];
  }
  return result;
}

/* But how do do we ensure slugs are unique? Two general strategies:
  1. Re-roll when we hit an already-used slug
  2. Adjust our slug generation strategy to only ever give us un-claimed slugs.

  If we're serious about our first 2 design goals (short slugs, and accommodating
  many different slugs), option(2) is clearly better than option(1). 
  
  Why? As we have more and more slugs in our database, we'll get more and more
  collisions. For example, when we're 3/4 of the way through our set of possible
  7-char slugs, we'd expect to have to make four "rolls" before arriving at
  a slug that isn't already taken. And it'll just keep going up from there.

  So let's try to come up with a strategy for option (2).
    ... the answer is base conversion.

  USING BASE CONVERSION TO GENERATE SLUGS:
  We usually use base-10 numbers, which allow 10 possible numerals:
  0, 1, 2, 3, 4, 5, 6, ,7 ,8, 9

  Binary is base-2 and has 2 possible numerals: 0 and 1.

  Our random slug alphabet has 62 possible numerals
  (A-Z, a-z, and 0-9). So we can
  think of each of our possible "random" slugs as
   a unique number, ... base-62.

  So let's keep track of a global currentRandomSlugId.
  When a request for a new random slug comes in, we simply
  convert that number to base-62 (using our custom numeral set) 
  and return it. Oh, and we increment the currentRandomSlugId, in
  preparation for the next request for a random slug.
*/

var currentRandomSlugId = 0;

function generateRandomSlug() {
  var newId = currentRandomSlugId++;
  return baseConversion(newId, base62Alphabet);
}

// How do we do the base conversion? This is easiest to show by example:

/* 
Take the number 125 in base 10.
It has a 1 in the  100s place, a 2 in the 10s place, a 5 in the 1s place.
In general, the places in a base-10 number are:
10^0
10^1
10^2
10^3
etc.

The places in a base-62 number are:

62^0
62^1
62^2
62^3
etc.

So to convert 125 to base-62, we distribute that 125 across these
base-62 'places'. The highest 'place' that can take some is 62^1, which
is 62. 125/62 is 2 with a remainder of 1. So we put a 2 in
the 62's place and a 1 in the 1's place. So our answer is 21.

What about a higher number --say 7912?

Now we have enough to put something in the 3844's the 62^2 place.
7912/3844 is 2 with a remainder of 224. So we put a 2 in the 
3844's place and we distribute that remaining 244 across the 
remaining places -- the 62's place and the 1's place.

244 / 62 is 3 with a remainder of 38. So we put a 3 in the 62s
place and a 38 in the 1's place. We have this three-digit number:
2 3 38.
  ... now that 38 represents one numeral in our base-62 number
  so we need to convert that 38 into a specific choice from our 
  set of numerals: a-z, A-Z, and 0-9.

  Let's number each of our 62 numerals like so:

0: 0,
1: 1,
2: 2,
3: 3,
...
10: a,
11: b,
12: c,
...
36: A,
37: B,
38: C,
...
62: Z


As you can see, our 38th numeral is C. So we convert that 38 into a C. That
gives us 23C.

One potential issue: the currentRandomSlugId could give us something that a 
user has already claimed as a user-generated slug. We need to check for that
and if it happens we'll just increment the currentRandomSlugId and try again
(and again, potentially, until we hit a 'random' slug that hasn't been used yet)
*/

var currentRandomSlugId = 0;

function generateRandomSlug() {
  var slug = "";
  while(1) {
    var newId = currentRandomSlugId++;
    slug = baseConversion(newId, base62Alphabet);

    //make sure slug isn't already used:
    if(!DB.checkSlugExists(slug)) {
      break;
    }
  }
  return slug;
}

























































