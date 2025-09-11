import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function AdminDashboard({product}) {
  return (
    <div>
          <Card className="w-full max-w-sm mx-auto">
            <div className="relative">
              <img 
                src={product?.image}
                alt={product?.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
      
            <CardContent>
              <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
              <div className="flex justify-between mb-2 items-center">
                <span className={`text-lg font-semibold ${product?.salePrice > 0 ? "line-through text-gray-500" : ""}`}>
                  ${product?.price}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-lg font-bold text-green-600">
                    ${product?.salePrice}
                  </span>
                )}
              </div>
            </CardContent>
      
            <CardFooter className="flex justify-between items-center">
              <Button>Edit</Button>
              <Button variant="destructive">Remove</Button>
            </CardFooter>
          </Card>
      
    </div>
  )
}
