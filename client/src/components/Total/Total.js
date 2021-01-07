import React, { useState, useEffect, useContext } from "react";
import CurrencyFormat from "react-currency-format";
import "./Total.css";
import { useHistory } from "react-router-dom";
import Paypal from "../../util/Paypal";
import axios from "axios";
import { APIs } from "../../constraint/API";
import AppContext from "../../Context/AppContext";
function Total({ socket }) {
  const history = useHistory();
  const notice = "congraclution";
  const appcontext = useContext(AppContext);
  const [total, settotal] = useState(0);
  useEffect(() => {
    let val = 0;
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    if (
      appcontext.cart !== null &&
      appcontext.cart.length !== null &&
      appcontext.cart.length > 0
    ) {
      appcontext.cart.forEach(c => {
        console.log(c);
        let a = c.price;
        val = val + a;
        settotal(val);
      });
    } else {
      settotal(0);
    }
  }, [appcontext.cart]);
  const transactionSuccess = async data => {
    try {
      const res = await axios.post(`${APIs}/api/order`, {
        cartDetail: appcontext.cart,
        paymentData: data,
      });
      if (res.data.success) {
        appcontext.emptyCart();
        settotal(0);
        socket.emit("notificaton", "game");
        appcontext.loadUser();
        history.push("/");
      }
    } catch (error) {}
  };
  const transactionError = () => {
    console.log("Paypal error");
  };

  const transactionCanceled = () => {
    console.log("Transaction canceled");
  };
  return (
    <div className='total'>
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal (
              {appcontext.cart !== null && appcontext.cart.length !== null
                ? appcontext.cart.length
                : 0}
              ) products ): <strong>{total}</strong>
            </p>
            <small className='wrapperSubtotal'>
              <input type='checkbox' /> Wrap this up
            </small>
          </>
        )}
        decimalScale={2}
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <Paypal
        totalPrice={total}
        onSuccess={transactionSuccess}
        transactionError={transactionError}
        transactionCanceled={transactionCanceled}
      />
    </div>
  );
}

export default Total;
