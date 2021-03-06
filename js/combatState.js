console.log("combat script connected")

function combatStart()
{ 
	for(var i = 0; i <= currentHeros.length -1; i++)
	{
		if(currentHeros[i] != 0)
		{
			document.getElementById("MemberSlot"+(i+1)).style.backgroundImage="url("+ linkingHero[currentHeros[i]].Portrait +")";
			document.getElementById("MemberSlot"+(i+1)).classList.remove("PartyMemberOff");
			
			var MemberUl = $('#MemberSlot'+ (i+1)).find('ul');
		    $(MemberUl).append("<li id='Attack1-"+currentHeros[i]+"' onclick='call_attack(linkingHero[" + currentHeros[i] + "].Attack1, "+i+");'>" + linkingHero[currentHeros[i]].Attack1[0] + "</li>");
		    $(MemberUl).append("<li id='Attack2-"+currentHeros[i]+"' onclick='call_attack(linkingHero[" + currentHeros[i] + "].Attack2, "+i+");'>" + linkingHero[currentHeros[i]].Attack2[0] + "</li>");
		    $(MemberUl).append("<li id='Special1-"+currentHeros[i]+"' onclick='call_attack(linkingHero[" + currentHeros[i] + "].Special1, "+i+");'>" + linkingHero[currentHeros[i]].Special1[0] + "</li>");
		    $(MemberUl).append("<li id='Special2-"+currentHeros[i]+"' onclick='call_attack(linkingHero[" + currentHeros[i] + "].Special2, "+i+");'>" + linkingHero[currentHeros[i]].Special2[0] + "</li>");
		    $(MemberUl).append("<li id='RunAway-"+currentHeros[i]+"' onclick='call_attack(linkingHero[" + currentHeros[i] + "].RunAway, "+i+");'>" + linkingHero[currentHeros[i]].RunAway[0] + "</li>");
		}
		else
		{
			document.getElementById("MemberSlot"+(i+1)).classList.add("PartyMemberOff");
		}

	}

	for(var i = 0; i < 3; i++)
	{
		if(currentMonsters[i] != 0)
		{
			document.getElementById("EnemySlot"+(i+1)).style.backgroundImage="url("+ linkingMonster[currentMonsters[i]].Portrait +")";
			document.getElementById("EnemySlot"+(i+1)).classList.remove("PartyMemberOff");
			var EnemyDiv = $('#EnemySlot'+ (i+1));
			$(EnemyDiv).append("<div id='Enemy-"+currentMonsters[i]+"' class='enemyAction' onclick='attack_monster(linkingMonster["+currentMonsters[i]+"], "+ i +");'></div>");

		}
		if(currentMonsters[i] == "")
		{
			document.getElementById("EnemySlot"+(i+1)).classList.add("PartyMemberOff");
		}

	}
}

function combatReup()
{
	console.log("Entering combatReup");
	hidden = [];
	$('.enemyAction').remove();
	for(var i = 0; i <= currentHeros.length -1; i++)
	{
		if(currentHeros[i] != 0)
		{
			document.getElementById("MemberSlot"+(i+1)).style.backgroundImage="url("+ linkingHero[currentHeros[i]].Portrait +")";
			document.getElementById("MemberSlot"+(i+1)).classList.remove("PartyMemberOff");
		}
		else
		{
			document.getElementById("MemberSlot"+(i+1)).classList.add("PartyMemberOff");
		}
	}
	for(var i = 0; i < 3; i++)
	{
		if(currentMonsters[i] != 0)
		{
			document.getElementById("EnemySlot"+(i+1)).style.backgroundImage="url("+ linkingMonster[currentMonsters[i]].Portrait +")";
			document.getElementById("EnemySlot"+(i+1)).classList.remove("PartyMemberOff");
			document.getElementById("EnemySlot"+(i+1)).classList.remove("Death");
			var EnemyDiv = $('#EnemySlot'+ (i+1));
			$(EnemyDiv).append("<div id='Enemy-"+currentMonsters[i]+"' class='enemyAction' onclick='attack_monster(linkingMonster["+currentMonsters[i]+"], "+ i +");'></div>");
		}
		if(currentMonsters[i] == "")
		{
			document.getElementById("EnemySlot"+(i+1)).classList.add("PartyMemberOff");
			document.getElementById("EnemySlot"+(i+1)).classList.remove("Death");
		}
	}
}

function updateUI()
{
	console.log("Enter updateUI");
	for(var i = 0; i <= currentHeros.length -1; i++)
	{
		if(currentHeros[i] != 0)
		{
			if(linkingHero[currentHeros[i]].Attack1[1] == false)
			{
				document.getElementById("Attack1-"+currentHeros[i]).classList.add("Used");
			}
			if(linkingHero[currentHeros[i]].Attack2[1] == false)
			{
				document.getElementById("Attack2-"+currentHeros[i]).classList.add("Used");
			}
			if(linkingHero[currentHeros[i]].Special1[1] == false)
			{
				document.getElementById("Special1-"+currentHeros[i]).classList.add("Used");
			}
			if(linkingHero[currentHeros[i]].Special2[1] == false)
			{
				document.getElementById("Special2-"+currentHeros[i]).classList.add("Used");
			}
			if(linkingHero[currentHeros[i]].RunAway[1] == false)
			{
				document.getElementById("RunAway-"+currentHeros[i]).classList.add("Used");
			}
		}
	}
	for(var p = 0; p <= currentMonsters.length -1; p++)
	{
		if(currentMonsters[p] > 0 && linkingMonster[currentMonsters[p]].HP <= 0)
		{
			document.getElementById("EnemySlot"+(p+1)).classList.add("Death");
			// $('#EnemySlot'+(p+1)).addClass('Death').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			// 	$(this).addClass('PartyMemberOff');
			// });

			//console.log("Enemy Dead = "+currentMonsters[p]);
		}
	}

	for(var i = 0; i <= currentHeros.length -1; i++)
	{
		if(currentHeros[i] == 0)
		{
			document.getElementById("MemberSlot"+(i+1)).classList.add("PartyMemberOff");
		}
	}
	
	for(var i = 0; i <= hidden.length -1; i++)
	{
		if(hidden[i] >= 0)
		{
			var currentHidden = $.inArray(hidden[i], currentHeros);
			document.getElementById("MemberSlot"+(parseInt(hidden[i])+1)).classList.add("PartyMemberOff");
			//console.log("Hide: " + "MemberSlot"+(parseInt(hidden[i])+1));
		}
	}
}

function loadBark(inTxt, enemyHit)
{
	console.log("BarkText: " + inTxt);
	console.log("enemy Hit: " + enemyHit);
	document.getElementById("barkText").innerHTML = inTxt;
	//document.getElementById("barkText").classList.add("Death");
	$('#barkText').removeClass('Death').addClass('Death').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$('#barkText').removeClass('Death');
	});
	if(enemyHit == 0)
	{
		//document.getElementById("EnemySlot"+(parseInt(enemyHit)+1)).classList.add("Shake");
		$('#EnemySlot'+(parseInt(enemyHit)+1)).removeClass('Shake').addClass('Shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#EnemySlot'+(parseInt(enemyHit)+1)).removeClass('Shake');
		});

	}
	if(enemyHit == 1)
	{
		document.getElementById("EnemySlot"+(parseInt(enemyHit)+1)).classList.add("Shake");
	}
	if(enemyHit == 2)
	{
		document.getElementById("EnemySlot"+(parseInt(enemyHit)+1)).classList.add("Shake");
	}
	if(enemyHit == 4)
	{
		document.getElementById("EnemySlot1").classList.add("Shake");
		document.getElementById("EnemySlot2").classList.add("Shake");
		document.getElementById("EnemySlot3").classList.add("Shake");
	}
	if(enemyHit == 5)
	{
		console.log("Smoke");
	}
}



function continueCombat()
{
	setTimeout('getMonsterManifest(); newCombat(); combatReup();',3000);
}

combatStart();