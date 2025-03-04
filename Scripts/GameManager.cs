using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class GameManager : MonoBehaviour
{
    public GameObject playerPrefab;
    void Start()
    {
        GameObject player1 = Instantiate(playerPrefab, new Vector3(-2, 0, 0), Quaternion.identity);
        player1.GetComponent<PlayerController>().playerID = 1;
        GameObject player2 = Instantiate(playerPrefab, new Vector3(2, 0, 0), Quaternion.identity);
        player2.GetComponent<PlayerController>().playerID = 2;
    }
}