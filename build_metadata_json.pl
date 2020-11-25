#!/usr/bin/perl

my $nb = 1000;

print  "{\n";
print "\"label\": \"Conservation level\",\n";
print "\"categories\":[\n";
# cat1
print "{\n";
print "\"label\": \"high level\",\n";

# debut style
print "\"style\": {\n";
print "\"fill\": \"red\",\n";
print "\"fill-opacity\": \"0.5\"\n";
print "},\n";
print "\"regions\": [\n";

for (my $i = 1; $i <=$nb ; $i++)
{
	print "{\n";
	print "   \"id\": \"seq$i\",\n";
    print "   \"ranges\": [[21,176],[180,186],[210,230]]\n";
	if ($i < $nb) {    
		print "},\n";
	} else { 
		print "}\n";
	}
}

# fin regions
print "]\n";
# fin cat1
print "},\n";


# cat1
print "{\n";
print "\"label\": \"medium level\",\n";

# debut style
print "\"style\": {\n";
print "\"fill\": \"blue\",\n";
print "\"fill-opacity\": \"0.5\"\n";
print "},\n";
print "\"regions\": [\n";

for (my $i = 1; $i <=$nb ; $i++)
{
	print "{\n";
	print "   \"id\": \"seq$i\",\n";
    print "   \"ranges\": [[1,20],[177,179]]\n";
	if ($i < $nb) {    
		print "},\n";
	} else { 
		print "}\n";
	}
}

# fin regions
print "]\n";
# fin cat2
print "}\n";


print "]\n";
# fin object
print "}\n";


