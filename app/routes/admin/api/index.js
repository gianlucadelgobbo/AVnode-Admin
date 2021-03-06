const router = require('../../router')();
const config = require('getconfig');

const get = require('./get');
const put = require('./put');
const post = require('./post');
const upload = require('./upload');

const logger = require('../../../utilities/logger');

if (process.env.DEBUG) {
  router.get('/config', (req, res) => {
    res.render('json', {data: require('getconfig').cpanel});
  });
}



// PROFILE GET
router.get('/profile/public/slugs/:slug', (req, res)=>{
  req.params.id = req.user.id;
  req.params.sez = 'profile';
  get.getSlug(req, res);
});

router.get('/setstatsandactivity/:id', (req, res)=>{
  get.setStatsAndActivity(req, res);
});

router.get('/profile/:form/', (req, res) => {
  req.params.id = req.user.id;
  req.params.sez = 'profile';
  get.getData(req, res, "json");
});

router.get('/profile/emails/verify/:email', (req, res)=>{
  req.params.id = req.user.id;
  req.params.sez = 'profile';
  get.sendEmailVericaition(req, res);
});

router.get('/profile/emails/email/:email', (req, res)=>{
  get.getEmail(req, res);
});

router.get('/subscriptions', (req, res) => {
  req.params.id = req.user.id;
  req.params.sez = 'subscriptions';
  req.query.api = true;
  get.getSubscriptions(req, res);
});

router.get('/:id/subscriptions', (req, res) => {
  req.params.sez = 'subscriptions';
  req.query.api = true;
  get.getSubscriptions(req, res);
});

// ALL GET

router.get('/:sez/new/slugs/:slug', (req, res)=>{
  get.getSlug(req, res);
});

router.get('/:sez/:id/public/slugs/:slug', (req, res)=>{
  get.getSlug(req, res);
});

router.get('/:sez/:id/delete', (req, res) => {
  get.getDelete(req, res);
});

router.get('/:sez/:id/duplicate', (req, res) => {
  get.getDuplicate(req, res);
});

router.get('/:sez/:id/:form/', (req, res) => {
  get.getData(req, res, "json");
});

// UTILITIES

router.get('/countries', (req, res) => {
  get.getCountries(req, res);
});

router.get('/getcategories/:rel/slug/:q', (req, res)=>{
  get.getCategories(req, res);
});

router.get('/getmembers/:q', (req, res)=>{
  get.getMembers(req, res);
});

router.get('/getauthors/:q', (req, res)=>{
  get.getAuthors(req, res);
});

router.get('/removeAddress', (req, res)=>{
  get.removeAddress(req, res);
});

router.get('/crews/:id/members/add/:member', (req, res)=>{
  get.addMember(req, res);
});

router.get('/crews/:id/members/remove/:member', (req, res)=>{
  get.removeMember(req, res);
});

router.get('/:sez/:id/users/add/:user', (req, res)=>{
  get.addUser(req, res);
});

router.get('/:sez/:id/users/remove/:user', (req, res)=>{
  get.removeUser(req, res);
});

router.get('/galleries/:id/mediaremove/:image', (req, res)=>{
  req.params.sez = 'galleries';
  get.removeImage(req, res);
});

router.get('/playlists/:id/footageremove/:footage', (req, res)=>{
  req.params.sez = 'playlists';
  get.removeFootage(req, res);
});

router.get('/events/:id/performance/add/:performance', (req, res)=>{
  get.eventAddPerformance(req, res);
});

router.get('/events/:id/performance/remove/:performance', (req, res)=>{
  get.eventRemovePerformance(req, res);
});

router.get('/performances/:id/event/add/:event', (req, res)=>{
  get.performanceAddEvent(req, res);
});

router.get('/performances/:id/event/remove/:event', (req, res)=>{
  get.performanceRemoveEvent(req, res);
});

router.get('/:sez/:id/gallery/add/:gallery', (req, res)=>{
  get.addGallery(req, res);
});

router.get('/:sez/:id/gallery/remove/:gallery', (req, res)=>{
  get.removeGallery(req, res);
});

router.get('/:sez/:id/video/add/:video', (req, res)=>{
  get.addVideo(req, res);
});

router.get('/:sez/:id/video/remove/:video', (req, res)=>{
  get.removeVideo(req, res);
});

router.get('/loggeduser', (req, res) => {
  res.json(req.user);
});

router.get('/:sez', (req, res) => {
  req.params.id = req.user.id;
  get.getList(req, res, "json");
});
/* 
router.get('/subscriptions', (req, res) => {
  req.params.id = req.user.id;
  req.params.sez = 'subscriptions';
  get.getSubscriptions(req, res);
}); */

router.get('/profile/:id/subscriptions', (req, res) => {
  req.params.sez = 'subscriptions';
  get.getSubscriptions(req, res);
});

router.get('/*', (req, res) => {
  res.status(404).send({ message: `API_NOT_FOUND` });
});

router.get('', (req, res) => {
  res.status(404).send({ message: `API_NOT_FOUND` });
});






router.post('/setvideocategory', (req, res)=>{
  post.setVideoCategory(req, res);
});

router.post('/shareontelegram', (req, res)=>{
  post.shareOnTelegram(req, res);
});

router.post('/setvideoexclude', (req, res)=>{
  post.setVideoExclude(req, res);
});

router.post('/profile/emails/updateSendy', (req, res)=>{
  post.updateSendy(req, res);
});

router.post('/:sez/new/', (req, res) => {
  post.postData(req, res);
});

router.post('/partner/unlink/', (req, res) => {
  post.unlinkPartner(req, res);
});

router.post('/partner/link/', (req, res) => {
  post.linkPartner(req, res);
});

router.post('/partnershipsupdate', (req, res) => {
  post.updatePartnerships(req, res);
});

router.post('/partners/contacts/add/', (req, res) => {
  post.addContacts(req, res);
});

router.post('/partners/contacts/delete/', (req, res) => {
  post.deleteContacts(req, res);
});



/* router.post('/performances/:id/videos', (req, res)=>{
  req.params.model = 'Performance';
  get.addVideo(req, res);
});

router.post('/performances/:id/galleries', (req, res)=>{
  req.params.model = 'Performance';
  get.addGallery(req, res);
});

router.post('/events/:id/videos', (req, res)=>{
  req.params.model = 'Event';
  get.addVideo(req, res);
});

router.post('/events/:id/galleries', (req, res)=>{
  req.params.model = 'Event';
  get.addGallery(req, res);
}); */

router.post('/programupdate', (req, res)=>{
  post.updateProgram(req, res);
});

router.post('/subscriptionupdate', (req, res)=>{
  post.updateSubscription(req, res);
});

router.post('/cancelsubscription', (req, res)=>{
  post.cancelSubscription(req, res);
});

router.post('/editsubscription', (req, res)=>{
  post.editSubscription(req, res);
});

router.post('/editsubscriptionprice', (req, res)=>{
  post.editSubscriptionPrice(req, res);
});

router.post('/editsubscriptioncost', (req, res)=>{
  post.editSubscriptionCost(req, res);
});

router.post('/editsubscriptionsave', (req, res)=>{
  post.editSubscriptionSave(req, res);
});
router.post('/bookingrequest', (req, res)=>{
  post.bookingRequest(req, res);
});
router.post('/contact', (req, res)=>{
  post.contact(req, res);
});

/* router.post('/:ancestor/:id/:sez/', (req, res) => {
  post.postData(req, res);
});
 */
router.post('/:sez/:id/:form/', (req, res) => {
  console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body")
  console.log(req.body)
  if (['profile/image','crews/image','events/image','news/image','performances/image','footage/media','galleries/medias','videos/video'].indexOf(req.params.sez+'/'+req.params.form)!== -1) {
    req.params.comp = ['footage/media','videos/video'].indexOf(req.params.sez+'/'+req.params.form)!== -1 ? "media" : ['galleries/medias'].indexOf(req.params.sez+'/'+req.params.form)!== -1 ? "image" : req.params.form;
    upload.uploader(req, res, (err, data) => {
      if (!data) {
        console.log("stocazzo2")
        res.status(500).send(err);
      } else {
        console.log("stocazzo")
        for (const item in data) req.body[item] = data[item];
        put.putData(req, res, "json");
      }
    });
  } else {
    put.putData(req, res, "json");
  }
});

/* router.put('/profile/:form/', (req, res) => {
  req.params.id = req.user.id;
  req.params.sez = 'profile';
  if (['profile/image'].indexOf(req.params.sez+'/'+req.params.form)!== -1) {
    req.params.comp = req.params.form;
    upload.uploader(req, res, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        for (const item in data) req.body[item] = data[item];
        put.putData(req, res);
      }
    });
  } else {
    put.putData(req, res);
  }
}); */


module.exports = router;
