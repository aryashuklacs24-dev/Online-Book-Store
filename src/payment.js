function processPayment(user, orderId) {
  // Rule 1: Potential null dereference
  if (user == null) {
    user.getName();
  }

  // Rule 2: SQL Injection
  const query = "SELECT * FROM orders WHERE id=" + orderId;

  // Rule 3: Redundant boolean
  const isPaid = false;
  if (isPaid == true) {
    console.log("Payment processed for:", orderId);
  }
  
  return query;
}

module.exports = { processPayment };
