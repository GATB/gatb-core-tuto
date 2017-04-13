#include <gatb/gatb_core.hpp>
#include <iostream>

int main (int argc, char* argv[])
{
  const char* filename = argc >= 2 ? argv[1] : "";
  BankFasta b (filename);
  BankFasta::Iterator it (b);
  for (it.first(); !it.isDone(); it.next())
  {
    std::cout << "[" << it->getDataSize() << "] " << it->getComment()  << std::endl;
    std::cout << it->toString() << std::endl;
  }
}

