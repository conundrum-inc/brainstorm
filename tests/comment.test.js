

describe('Comments', function() {

  //drop the current collection
  Comments.collection.drop();

  beforeEach(function(done) {
    //before each test, create and save a test comment to the database

    var newComment = new Comment({
      parent_id: '1111',
      children: [],
      creator_id: '1',
      session_id: '1',
      title: 'test comment',
      text: 'this is a test comment',
      upvotes: [],
      downvotes: [],
      score: 0,
      timestamp: new Date()
    })

    newComment.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    //after each test, drop the collection

    Comments.collection.drop();
    done();
  })

  //test GET to /comment
  //test POST to /comment

  //test GET to /allComments

  //test POST to /edit

  //test POST to /upvote
  //test POST to /downvote


})




