//httpPort: Port that this service listens on.
//storageFile: File where Topics are stored.
//username: IMAP Enabled Gmail Address
//paswword: IMAP Enabled Gmail Password


require( './lib' )
  .set( 'httpPort', 8432)
  .set( 'storageFile', 'C:/Users/khumphrey/Desktop/foo.txt')
  .set( 'username', 'TopicoSparker@gmail.com')
  .set( 'password', 'ConversationStarter')
  .start();