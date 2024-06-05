# displayScreensAndStuff

This will be a git repo for the various display screens that we'll want to have set up in the SOC at GVSU. It's mostly going to be pertaining to cybersecurity things and stuff... IDK. I don't really know what I want to put in here. So I think that I'm just going to leave this description as it is for now.

But I guess that we can put, like, a rough idea of how we're going to map these things out as we go so that we're not just shooting in the dark/coding into a corner or anything like that. Should really probably figure out a more professional way to word this. But It's not really what I'm trying to do right now. Look below for rough ideas for what will be displayed on each screen

## Screen 1

Stuff for the left most screen in the SOC. The one we do most of our work on by the crazy guy email.

### For the screen we already got

- Locked acounts: Should we kill it altogether, move it to a different screen where we can enlarge and possibly autoscroll it, or just leave it as-is?
- Counts of failed logins to go below the successful login screen - that'll really tie everything together
- Gotta make sure that everything is updating and not just hardcoded

### Firewall Screen

- Allowed threats: Should we go by volume or have a specific... feed or something that... that's an idea, I guess
- Port scans - should probably elaborate on this a little more

#### Threatr stuff

- Top countries blocked, inbound/outbound?
- other stuff
- ???

### Okta

- they started a thought and then finished it. So I don't really know what to do with that. I've just got "gotta make sure...?" written. What do I need to make sure of?
- Watch trends of enrollment, monitor for upticks - this information is in splunk. Just need to set up the queries, infographics
- Multiple authentications from same IP - feed style, this way we can look at who's coming in, figure out where 
- Pie chart of what apps people are using for authentication. Do like a top 10 where the bottom value is "other": an amalgamation of everything from position 10 and... worse. Can also chart this by day, week, month... should this just get it's own screen then?

### Authy AD/LDAP

- Locked accounts for users of AD
- show # of locked accounts and their sources
- Should this go on screen 3?

### Login Trends

- should this go in with the Okta stuff?
- Either way, it's going to need to be looked into so that we can incorporate this.

## Screen 3

The corner one. Not the one that I run Bloomberg on. Gonna try and avoid using that one if at all possible.

### WinDefender 

- Apparently we can get some relevant data from azure council
- O365 index?
- MSSec index?
- Should we show alerts for elevation of privileges and things? Maybe do a map?

### iSOC

- will need to look more into that

### haveibeenpwned?

- We apparently have an app but we're going to have to figure out what all we want to put up in here
- Generally, student/university accounts that have been compromised

### Honeypot

- apparently we have honeypots. So that will be worth looking into
