function isValidWalk(walk) {
  var arrayLength = walk.length;
  var x=0;
  var y=0;
  if(arrayLength!=10){
    return false;
  }
  for (var i = 0; i < arrayLength; i++) {
    if(walk[i]=="n"){
      y+=1;
    }if(walk[i]=="s"){
      y-=1;
    }if(walk[i]=="w"){
      x+=1;
    }if(walk[i]=="e"){
      x-=1;
    }
  }
  if(x==0 && y==0){
    return true;
  }else{
  return false;
  }
}
