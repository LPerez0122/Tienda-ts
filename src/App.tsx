
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";



function App() { 


const { data, cart, addtoCart, removeFromCart, descremenquantity, increasequantity, clearCart,isEmpty,carTotal} = useCart ()


  return (
    <>  
 
 <Header  
 cart={cart}
 removeFromCart={removeFromCart}
 increasequantity={increasequantity}
 descremenquantity={descremenquantity}
 clearCart={clearCart}
 isEmpty={isEmpty}
 carTotal={carTotal}
 />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map ((guitar) => (
              <Guitar 
              key={guitar.id}
              guitar ={guitar}
              addtoCart={addtoCart}
              />  
             
          ))}
        
      
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Pérez-SofT - Todos los derechos Reservados</p>
        </div>
    </footer>


    </>
  )
}

export default App
