#!/bin/bash
g++ -O3 -ffast-math model.cpp
for i in $(seq 10 10 110)
do
  echo $i
  time ./a.out $i 100 1000 > $i.dat
done
