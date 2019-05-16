package main

import "fmt"

func main(){

i:=1
fmt.Println(i)
i=2
fmt.Println(i)

i=1
for i<3 {
fmt.Println(i)
i=i+1
}

for j:=5; j<9; j++{
fmt.Println("loop",j)
if j==8{
break
}
}

for n:=0; n<5;n++{

if n%2==0{
fmt.Println(n)
}
}



}
