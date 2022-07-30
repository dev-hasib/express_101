# lottery API
- sell lottery ticket
- update lottery ticket 
- delete lottery ticket 
- get all ticket
- get ticket by id
- bulk buy (one user can buy multiple ticket at a time)
- raffle draw
  

  # Ticket Shape:
  1.Ticket number (Uniq identifier)
  2.Ticket holder name
  3.Ticket issus date
  4.Price

  # Routes:
   - /tickets/t/:ticketId  GET    -find single ticket by id
   - /tickets/u/:username  GET    -find single ticket by username
   - /tickets/t/:ticketId  PATCH  -update by id
   - /tickets/u/:username  PATCH  -update by username
   - /tickets/t/:ticketId  DELETE -delete user for given id
   - /tickets/u/:username  DELETE -delete user for give username
   - /tickets/sell         POST   -create tickets
   - /tickets/bulk/        POST   -create bulk sell
   - /tickets/draw         GET    -get winner
   - /tickets              GET    -find all tickets