BeginPackage["Bezout`"]

    (* Mathematica 5.0 defines Global`BezoutMatrix as being protected with no
       value.  I'm unprotecting it here.  This may cause problems in future
       versions of Mathematica. *)
	   
	ClearAttributes[BezoutMatrix, Protected]
	
	BezoutMatrix::usage =
		"Create a BezoutMatrix of order l without expanding its entries"
		
    Begin["`Private`"]
        bezoutMin[i_, j_, l_] := Min[l, 2 l - 1 - i - j]
        bezoutMax[i_, j_, l_] := Max[l - j, l - i]
        bezoutSub[i_, j_, k_, l_] := 2 l - 1 - i - j - k

        bezoutEntry[i_, j_, l_] := \!\(Sum[Global`v\_\(k, bezoutSub[i, j, k, l]\), {k, bezoutMax[i, j, l], bezoutMin[i, j, l]}]\)
        BezoutMatrix[l_Integer] := Table[bezoutEntry[i, j, l], {i, 0, l - 1}, {j, 0, l - 1}]
    End[]
EndPackage[]
